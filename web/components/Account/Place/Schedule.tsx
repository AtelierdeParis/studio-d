import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React from 'react'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex } from '@chakra-ui/react'
import isSameDay from 'date-fns/isSameDay'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridMonth',
      eventContent: ({ event }) => {
        // @ts-ignore
        return <ScheduleSlot {...event._def.extendedProps} />
      },
    },
  },
})

interface ISchedule {
  events: Record<string, any>
}

const Schedule = ({ events }: ISchedule) => {
  return (
    <Flex
      w="600px"
      backgroundColor="blue.100"
      borderRadius="sm"
      px={4}
      id="calendar"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, view]}
        initialView="custom"
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next',
        }}
        height="700px"
        dayCellContent={(day) => {
          return <Box>{day.dayNumberText}</Box>
        }}
        eventDataTransform={(event) => {
          const hasEventSameDay = events.some(({ start, extendedProps }) => {
            return (
              extendedProps.when !== event.extendedProps.when &&
              // @ts-ignore
              isSameDay(new Date(start), new Date(event.start))
            )
          })
          return {
            ...event,
            extendedProps: {
              ...event.extendedProps,
              hasEventSameDay,
            },
          }
        }}
        showNonCurrentDates={false}
        fixedWeekCount={false}
        events={events}
        locale={frLocale}
      />
    </Flex>
  )
}

export default Schedule

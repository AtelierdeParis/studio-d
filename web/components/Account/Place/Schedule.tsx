import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React, { useRef, useEffect, useContext, useMemo } from 'react'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex } from '@chakra-ui/react'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { useFormContext } from 'react-hook-form'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridMonth',
      eventContent: ({ event }) => {
        return (
          // @ts-ignore
          <ScheduleSlot
            {...event._def.extendedProps}
            range={event._instance.range}
          />
        )
      },
    },
  },
})

interface ISchedule {}

const Schedule = (props: ISchedule) => {
  const { watch } = useFormContext()
  const { start } = watch(['start'])
  const { oldEvents, newEvents } = useContext(ScheduleContext)
  const scheduleRef = useRef(null)

  useEffect(() => {
    if (!scheduleRef || !start) return
    const calendarApi = scheduleRef.current.getApi()
    calendarApi.gotoDate(new Date(start))
  }, [start, scheduleRef])

  const events = useMemo(
    () =>
      oldEvents.concat(newEvents).filter((event) => {
        return !(
          event.extendedProps.hasEventSameDay &&
          event.extendedProps.status === 'error'
        )
      }),
    [oldEvents, newEvents],
  )

  return (
    <Flex
      w="600px"
      backgroundColor="blue.100"
      borderRadius="sm"
      px={4}
      id="calendar"
    >
      <FullCalendar
        ref={scheduleRef}
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
        // eventClick={(event) => {
        // }}
        // showNonCurrentDates={false}
        fixedWeekCount={false}
        nextDayThreshold="00:00"
        events={events}
        locale={frLocale}
      />
    </Flex>
  )
}

export default Schedule

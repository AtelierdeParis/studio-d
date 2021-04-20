import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React, { useRef, useEffect } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import BookingScheduleSlot from '~components/Place/BookingScheduleSlot'
import BookingFilledUntil from '~components/Place/BookingFilledUntil'
import { ScheduleEvent } from '~@types/schedule-event.d'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import addMonths from 'date-fns/addMonths'
import isSameDay from 'date-fns/isSameDay'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridMonth',
      eventContent: ({ event }) => {
        return (
          <BookingScheduleSlot
            isMonth
            // @ts-ignore
            extendedProps={event._def.extendedProps}
            start={event._instance.range.start}
            end={event._instance.range.end}
          />
        )
      },
    },
  },
})

interface Props {
  place: Espace
  events: ScheduleEvent[]
}

const BookingScheduleMonth = ({ place, events }: Props) => {
  const firstScheduleRef = useRef(null)
  const secondScheduleRef = useRef(null)

  return (
    <Flex
      w="100%"
      layerStyle="bluebox"
      px={4}
      pb={10}
      id="calendar"
      className="account-schedule month"
      pos="relative"
      justifyContent="center"
    >
      <Flex maxW="1050px">
        <FullCalendar
          ref={firstScheduleRef}
          plugins={[dayGridPlugin, interactionPlugin, view]}
          initialView="custom"
          customButtons={{
            customPrev: {
              click: () => {
                const firstApi = firstScheduleRef.current.getApi()
                firstApi.prev()
                if (!secondScheduleRef.current) return null
                const secondApi = secondScheduleRef.current.getApi()
                secondApi.prev()
              },
            },
          }}
          headerToolbar={{
            start: 'customPrev',
            center: 'title',
            end: '',
          }}
          dayCellContent={(day) => {
            const hasEvent = events.some((event) =>
              isSameDay(event.start, day.date),
            )
            return <Box color={hasEvent && 'black'}>{day.dayNumberText}</Box>
          }}
          fixedWeekCount={false}
          events={events}
          locale={frLocale}
        />
        <FullCalendar
          ref={secondScheduleRef}
          plugins={[dayGridPlugin, interactionPlugin, view]}
          initialView="custom"
          initialDate={addMonths(new Date(), 1)}
          customButtons={{
            customNext: {
              click: () => {
                const firstApi = firstScheduleRef.current.getApi()
                const secondApi = secondScheduleRef.current.getApi()
                firstApi.next()
                secondApi.next()
              },
            },
          }}
          headerToolbar={{
            start: '',
            center: 'title',
            end: 'customNext',
          }}
          dayCellContent={(day) => {
            const hasEvent = events.some((event) =>
              isSameDay(event.start, day.date),
            )
            return <Box color={hasEvent && 'black'}>{day.dayNumberText}</Box>
          }}
          fixedWeekCount={false}
          events={events}
          locale={frLocale}
        />
      </Flex>
    </Flex>
  )
}

export default BookingScheduleMonth

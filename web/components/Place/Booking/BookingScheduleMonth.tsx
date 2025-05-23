import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import FullCalendar, { createPlugin } from '@fullcalendar/react'
import frLocale from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import addMonths from 'date-fns/addMonths'
import isSameDay from 'date-fns/isSameDay'
import { useRef } from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import BookingScheduleSlot from '~components/Place/Booking/BookingScheduleSlot'
import { Espace } from '~typings/api'
import BookingFilledUntil from '~components/Place/Booking/BookingFilledUntil'

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
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const firstScheduleRef = useRef(null)
  const secondScheduleRef = useRef(null)

  return (
    <Flex
      w="100%"
      layerStyle="bluebox"
      px={{ base: 0, lg: 4 }}
      pb={{ base: 4, lg: 10 }}
      id="calendar"
      className={`account-schedule month ${isMobile ? 'is-mobile' : ''}`}
      pos="relative"
      justifyContent="center"
    >
      <Flex maxW="1050px" w={{ base: '100%', lg: 'auto' }}>
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
            start: isMobile ? 'prev' : 'customPrev',
            center: 'title',
            end: isMobile ? 'next' : '',
          }}
          dayCellContent={(day) => {
            const hasEvent = events.some((event) =>
              isSameDay(event.start, day.date),
            )
            return (
              <Box
                color={hasEvent && 'black'}
                fontSize={{ base: '11px', sm: 'sm', md: 'md' }}
              >
                {day.dayNumberText}
              </Box>
            )
          }}
          showNonCurrentDates={isMobile}
          fixedWeekCount={false}
          events={events}
          locale={frLocale}
        />
        {!isMobile && (
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
            showNonCurrentDates={false}
            fixedWeekCount={false}
            events={events}
            locale={frLocale}
          />
        )}
      </Flex>
      <BookingFilledUntil isMonthlyView place={place} />
    </Flex>
  )
}

export default BookingScheduleMonth

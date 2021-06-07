import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React, { useRef, useState, useMemo } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import { checkCurrentSearch } from '~utils/search'
import BookingScheduleSlot from '~components/Place/BookingScheduleSlot'
import BookingFilledUntil from '~components/Place/BookingFilledUntil'
import { ScheduleEvent } from '~@types/schedule-event.d'
import min from 'date-fns/min'
import isBefore from 'date-fns/isBefore'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridWeek',
      eventContent: ({ event }) => {
        return (
          <BookingScheduleSlot
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

const BookingScheduleWeek = ({ place, events = [] }: Props) => {
  const scheduleRef = useRef(null)
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const initialDate = useMemo(() => {
    if (events.length === 0) return new Date()
    let array = [...events]
    const prevPath = sessionStorage.getItem('sd-prevPath')

    const hasSearch = checkCurrentSearch()
    if (hasSearch) {
      const url = new URL(prevPath, process.env.NEXT_PUBLIC_FRONT_URL)
      const startDate = url.searchParams.get('startDate')
      if (startDate) {
        array = events.filter((evt) => {
          return !isBefore(evt.start, new Date(startDate))
        })
        if (array.length === 0) return new Date()
      }
    }

    return min(array.map(({ start }) => start))
  }, [events])

  return (
    <Flex
      w="100%"
      layerStyle="bluebox"
      px={4}
      id="calendar"
      className="booking-calendar week"
      pos="relative"
    >
      <FullCalendar
        ref={scheduleRef}
        plugins={[dayGridPlugin, interactionPlugin, view]}
        initialView="custom"
        initialDate={initialDate}
        datesSet={({ start, end }) => {
          setDateRange({ start, end })
        }}
        headerToolbar={{
          start: 'prev',
          center: '',
          end: 'next',
        }}
        dayCellContent={() => {
          return (
            <SimpleGrid columns={1} h="100%" direction="column" rowGap={4}>
              <Flex justifyContent="center" alignItems="center">
                <Box bgColor="#cbcfe1" h="3px" w="20px" m={3} />
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Box bgColor="#cbcfe1" h="3px" w="20px" m={3} />
              </Flex>
            </SimpleGrid>
          )
        }}
        // @ts-ignore
        dayHeaderFormat={(date) => {
          return (
            <Box>
              <Text>{format(date.start.marker, 'eeee')}</Text>
              <Text color="black">{format(date.start.marker, 'd MMM')}</Text>
            </Box>
          )
        }}
        height="300px"
        events={events}
        locale={frLocale}
      />
      <BookingFilledUntil start={dateRange.start} place={place} />
    </Flex>
  )
}

export default BookingScheduleWeek

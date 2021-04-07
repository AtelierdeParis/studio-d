import FullCalendar, { createPlugin } from '@fullcalendar/react'
import React, { useMemo } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import { createOldEvents } from '~utils/schedule'
import BookingScheduleSlot from '~components/Place/BookingScheduleSlot'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridWeek',
      eventContent: ({ event }) => {
        return (
          // @ts-ignore
          <BookingScheduleSlot
            {...event._def.extendedProps}
            range={event._instance.range}
          />
        )
      },
    },
  },
})

interface Props {
  place: Espace
}

const BookingSchedule = ({ place }: Props) => {
  const events = useMemo(() => createOldEvents(place?.disponibilities), [
    place?.disponibilities,
  ])

  return (
    <Flex
      w="100%"
      backgroundColor="blue.100"
      borderRadius="sm"
      px={4}
      id="calendar"
      className="booking-calendar"
      pos="relative"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, view]}
        initialView="custom"
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
        height="400px"
        // dateClick={(date) => {
        //   if (eventsIdToDelete.length > 0) setToDelete([])
        // }}

        events={events}
        locale={frLocale}
      />
    </Flex>
  )
}

export default BookingSchedule

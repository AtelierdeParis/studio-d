import React from 'react'
import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import FullCalendar, { createPlugin, sliceEvents } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'

const view = createPlugin({
  views: {
    custom: {
      type: 'dayGridMonth',
      eventContent: ({ event }) => {
        return <ScheduleSlot type={event._def.extendedProps.type} />
      },
    },
  },
})

interface IPlaceSchedule {}

const PlaceSchedule = ({}: IPlaceSchedule) => {
  const { t } = useTranslation('place')

  const handleDateClick = (val) => {
    console.log(val)
  }

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
        showNonCurrentDates={false}
        dateClick={handleDateClick}
        fixedWeekCount={false}
        events={[
          {
            title: 'event 1',
            date: '2021-03-01',
            extendedProps: {
              type: 'morning',
            },
          },
          {
            title: 'event 2',
            date: '2021-03-02',
            extendedProps: {
              type: 'afternoon',
            },
          },
          {
            title: 'event 2',
            date: '2021-03-03',
          },
        ]}
      />
    </Flex>
  )
}

export default PlaceSchedule

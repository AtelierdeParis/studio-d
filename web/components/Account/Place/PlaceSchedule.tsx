import React, { useMemo, useState } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import FullCalendar, { createPlugin } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import ScheduleInfo from '~components/Account/Place/ScheduleInfo'
import ScheduleForm, { schema } from '~components/Account/Place/ScheduleForm'
import { createScheduleEvents } from '~utils'
import { Place } from '~@types/place.d'

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

interface IPlaceSchedule {
  place: Place
}

const PlaceSchedule = ({ place }: IPlaceSchedule) => {
  const [showForm, setShowForm] = useState(false)
  const form = useForm({
    resolver: yupResolver(schema),
  })
  const formValues = form.watch()
  const scheduleEvents = useMemo(
    () => createScheduleEvents(formValues, place?.disponibilities),
    [formValues, place?.disponibilities],
  )
  console.log(scheduleEvents)
  return (
    <FormProvider {...form}>
      <Flex>
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
            showNonCurrentDates={false}
            fixedWeekCount={false}
            events={scheduleEvents}
            locale={frLocale}
          />
        </Flex>
        <Box flex={1} pl={8}>
          {showForm ? (
            <ScheduleForm
              scheduleEvents={scheduleEvents}
              place={place}
              hideForm={() => setShowForm(false)}
            />
          ) : (
            <ScheduleInfo
              placeId={place?.id}
              showForm={() => setShowForm(true)}
            />
          )}
        </Box>
      </Flex>
    </FormProvider>
  )
}

export default PlaceSchedule

import React, { useMemo } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import FullCalendar, { createPlugin } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ScheduleSlot from '~components/Account/Place/ScheduleSlot'
import ScheduleForm, { schema } from '~components/Account/Place/ScheduleForm'
import { createScheduleEvents } from '~utils'

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

interface IPlaceSchedule {}

const PlaceSchedule = ({}: IPlaceSchedule) => {
  const form = useForm({
    resolver: yupResolver(schema),
  })
  const formValues = form.watch()
  const scheduleEvents = useMemo(() => createScheduleEvents(formValues), [
    formValues,
  ])

  const handleDateClick = (val) => {
    console.log(val)
  }

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
            selectable
            height="700px"
            dayCellContent={(day) => {
              return <Box>{day.dayNumberText}</Box>
            }}
            showNonCurrentDates={false}
            dateClick={handleDateClick}
            fixedWeekCount={false}
            events={scheduleEvents}
            locale={frLocale}
          />
        </Flex>
        <Box flex={1} pl={8}>
          <ScheduleForm />
        </Box>
      </Flex>
    </FormProvider>
  )
}

export default PlaceSchedule

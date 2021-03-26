import React, { useMemo, useState, useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ScheduleInfo from '~components/Account/Place/ScheduleInfo'
import Schedule from '~components/Account/Place/Schedule'
import ScheduleForm, { schema } from '~components/Account/Place/ScheduleForm'
import { createScheduleEvents, createScheduleEventObj } from '~utils'
import { usePlace } from '~hooks/usePlace'

interface IPlaceSchedule {
  placeId: number
}

const PlaceSchedule = ({ placeId }: IPlaceSchedule) => {
  const [showForm, setShowForm] = useState(false)
  const { data: place } = usePlace(placeId)
  const form = useForm({
    resolver: yupResolver(schema),
  })
  const formValues = form.watch()

  const newEvents = useMemo(() => createScheduleEvents(formValues), [
    formValues,
  ])

  const oldEvents = useMemo(
    () =>
      place?.disponibilities.map((dispo) => {
        return createScheduleEventObj(
          dispo.start,
          dispo.when,
          dispo.end,
          'available',
        )
      }),
    [place, newEvents],
  )

  return (
    <FormProvider {...form}>
      <Flex>
        <Schedule events={oldEvents.concat(newEvents)} />
        <Box flex={1} pl={8}>
          {showForm ? (
            <ScheduleForm
              newEvents={newEvents}
              place={place}
              hideForm={() => setShowForm(false)}
            />
          ) : (
            <ScheduleInfo place={place} showForm={() => setShowForm(true)} />
          )}
        </Box>
      </Flex>
    </FormProvider>
  )
}

export default PlaceSchedule

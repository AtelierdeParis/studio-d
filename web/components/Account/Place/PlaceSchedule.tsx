import React, { useState } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ScheduleInfo from '~components/Account/Place/ScheduleInfo'
import Schedule from '~components/Account/Place/Schedule'
import ScheduleForm, { schema } from '~components/Account/Place/ScheduleForm'
import ScheduleProvider from '~components/Account/Place/ScheduleProvider'
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

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Flex>
          <Schedule />
          <Box flex={1} pl={8}>
            {showForm ? (
              <ScheduleForm place={place} hideForm={() => setShowForm(false)} />
            ) : (
              <ScheduleInfo place={place} showForm={() => setShowForm(true)} />
            )}
          </Box>
        </Flex>
      </ScheduleProvider>
    </FormProvider>
  )
}

export default PlaceSchedule

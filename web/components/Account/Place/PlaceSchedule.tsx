import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '~components/Account/Place/ScheduleForm'
import Schedule from '~components/Account/Place/Schedule'
import ScheduleProvider from '~components/Account/Place/ScheduleProvider'
import ScheduleRightContent from '~components/Account/Place/ScheduleRightContent'
import { usePlace } from '~hooks/usePlace'
import { Espace } from '~typings/api'

interface Props {
  place: Espace
}

const PlaceSchedule = ({ place }: Props) => {
  // const { data: place } = usePlace(place.slug)
  const form = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Flex>
          <Schedule />
          <Box flex={1} pl={8}>
            <ScheduleRightContent />
          </Box>
        </Flex>
      </ScheduleProvider>
    </FormProvider>
  )
}

export default PlaceSchedule

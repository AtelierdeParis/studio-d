import React from 'react'
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '~components/Account/Place/ScheduleForm'
import Schedule from '~components/Account/Place/Schedule'
import ScheduleProvider from '~components/Account/Place/ScheduleProvider'
import ScheduleRightContent from '~components/Account/Place/ScheduleRightContent'
import PlaceFormBar from '~components/Account/Place/PlaceFormBar'
import { Espace } from '~typings/api'
import ScheduleAbout from '~components/Account/Place/ScheduleAbout'

interface Props {
  place: Espace
}

const PlaceSchedule = ({ place }: Props) => {
  const isLarge = useBreakpointValue({ base: false, xl: true })
  const form = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Flex direction={{ base: 'column-reverse', schedule: 'row' }}>
          {!isLarge && <ScheduleAbout place={place} />}
          <Schedule />
          <Box flex={1} pl={{ base: 0, schedule: 8 }}>
            <ScheduleRightContent />
          </Box>
        </Flex>
      </ScheduleProvider>
      {place?.disponibilities.length === 0 && <PlaceFormBar isNotAvailable />}
    </FormProvider>
  )
}

export default PlaceSchedule

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
import ScheduleRecap from '~components/Account/Place/ScheduleRecap'
import ScheduleDelete from '~components/Account/Place/ScheduleDelete'

interface Props {
  place: Espace
  isCampaignTab?: boolean
}

const PlaceSchedule = ({ place, isCampaignTab }: Props) => {
  const isLarge = useBreakpointValue({ base: false, xl: true })
  const form = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <FormProvider {...form}>
      <ScheduleProvider place={place}>
        <Flex
          direction={{ base: 'column-reverse', schedule: 'row' }}
          pb={{ base: 8, lg: 4 }}
        >
          {!isLarge && !isCampaignTab && (
            <>
              <ScheduleAbout place={place} />
              <ScheduleRecap place={place} />
              <ScheduleDelete />
            </>
          )}
          <Schedule />
          <Box flex={1} pl={{ base: 0, schedule: 8 }}>
            <ScheduleRightContent isLarge={isLarge} />
          </Box>
        </Flex>
      </ScheduleProvider>
      {place?.disponibilities.length === 0 && <PlaceFormBar isNotAvailable />}
    </FormProvider>
  )
}

export default PlaceSchedule

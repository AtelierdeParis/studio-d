import React, { useState } from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import { Heading, Box, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import Tag from '~components/Tag'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import ApplicationRecap from '~components/Campaign/Places/Application/ApplicationRecap'
import ApplicationForm from '~components/Campaign/Places/Application/ApplicationForm'
import ApplicationConfirmed from '~components/Campaign/Places/Application/ApplicationConfirmed'

interface Props {
  events: ScheduleEvent[]
  place: Espace
  back: () => void
}

const CampaignApplicationPopin = ({ events, place, back }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const [isConfirmed, setConfirmed] = useState(false)
  const { t } = useTranslation('place')

  if (isConfirmed)
    return (
      <ApplicationConfirmed
        structureName={place.users_permissions_user.structureName}
      />
    )

  return (
    <Box
      maxW="container.lg"
      m="0 auto"
      pt={{ base: 0, lg: 12 }}
      px={{ base: 3, lg: 0 }}
    >
      <VStack spacing={12}>
        <VStack justifyContent="center" flex={1}>
          <Heading as="h1" textStyle="h1">
            {t('campaignApplication.title')}
          </Heading>
          <Tag status="campaign">
            {t('campaignApplication.tag', { title: currentCampaign?.title })}
          </Tag>
        </VStack>

        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          width="100%"
          spacing={14}
          flex={1}
        >
          <ApplicationForm
            back={back}
            setConfirmed={setConfirmed}
            events={events}
          />

          <ApplicationRecap place={place} events={events} back={back} />
        </Stack>
      </VStack>
    </Box>
  )
}

export default CampaignApplicationPopin

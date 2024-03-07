import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Divider,
  Button,
  VStack,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import Pin from 'public/assets/img/pin-outline.svg'
import BookingSelection from '~components/Place/Booking/BookingSelection'
import { useTranslation, Trans } from 'next-i18next'
import { ScheduleEvent } from '~@types/schedule-event'
import { useMemo } from 'react'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { format } from '~utils/date'

const ApplicationRecap = ({
  place,
  events,
}: {
  place: Espace
  events: ScheduleEvent[]
}) => {
  const isPlural = useMemo(() => (events.length > 1 ? 's' : ''), [events])
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const { applications } = useCurrentUser()
  const remainingApplications =
    currentCampaign?.applications_max - events.length - applications?.length

  return (
    <Box minW={{ base: 'auto', lg: '350px' }} flex={1}>
      <Flex>
        <Box>
          <AspectRatio
            minW="100px"
            ratio={4 / 3}
            flex={1}
            overflow="hidden"
            pos="relative"
            borderRadius="sm"
          >
            <Image src={place.images.length > 0 ? place.images[0].url : ''} />
          </AspectRatio>
        </Box>
        <Box pl={{ base: 3, sm: 6 }}>
          <Text
            fontFamily="mabry medium"
            fontWeight="500"
            whiteSpace="pre-line"
          >
            {place.name}
          </Text>
          <Text color="gray.500" whiteSpace="pre-line">
            {place.users_permissions_user.structureName}
          </Text>
          <Flex pt={2}>
            <Box>
              <Pin width="20px" height="20px" stroke="black" />
            </Box>
            <Text pl={3}>{place.address}</Text>
          </Flex>
        </Box>
      </Flex>
      <Divider my={6} opacity="0.5" />
      <Box>
        <Trans
          i18nKey={`place:confirm.recap${isPlural}`}
          components={{
            b: <b />,
          }}
          values={{
            nb: events.length,
          }}
        />
        <BookingSelection
          events={events}
          circleColor="confirm"
          isCampaignMode
        />
      </Box>

      <VStack alignItems={'flex-start'}>
        {remainingApplications > 0 && (
          <Text color="gray.400">
            {t(
              `campaign.helpers.applications.recap_remaining_application${
                remainingApplications > 1 ? 's' : ''
              }`,
              {
                num: remainingApplications,
              },
            )}
          </Text>
        )}

        <Text color="gray.400">
          {t('campaign.helpers.applications.recap_helper_date', {
            application_end_date: format(currentCampaign?.application_end),
          })}
        </Text>
      </VStack>
    </Box>
  )
}

export default ApplicationRecap

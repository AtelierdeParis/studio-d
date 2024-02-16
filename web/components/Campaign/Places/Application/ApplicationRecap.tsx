import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import Pin from 'public/assets/img/pin-outline.svg'
import BookingSelection from '~components/Place/Booking/BookingSelection'
import { useTranslation, Trans } from 'next-i18next'
import { ScheduleEvent } from '~@types/schedule-event'
import { useMemo } from 'react'

const ApplicationRecap = ({
  place,
  events,
  back,
}: {
  place: Espace
  events: ScheduleEvent[]
  back: () => void
}) => {
  const isPlural = useMemo(() => (events.length > 1 ? 's' : ''), [events])
  const { t } = useTranslation('place')

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
      <Button
        mt={4}
        variant="line"
        onClick={() => back()}
        borderBottomColor="blue.500"
      >
        {t('confirm.change')}
      </Button>
      <Divider my={6} display={{ base: 'block', lg: 'none' }} opacity="0.5" />
    </Box>
  )
}

export default ApplicationRecap

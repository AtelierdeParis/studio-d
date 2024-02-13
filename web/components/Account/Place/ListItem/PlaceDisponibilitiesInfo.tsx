import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useNbDisponibility from '~hooks/useNbDisponibility'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import Tag from '~components/Tag'
import { DisponibilityStatus } from '~@types/disponibility.d'
import {
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_ACCOUNT_PLACE_DETAIL,
  ROUTE_ACCOUNT_BOOKING,
} from '~constants'
import Link from '~components/Link'
import useNbBooking from '~hooks/useNbBooking'
import NoContent from '~components/Account/Place/ListItem/NoContent'

const PlaceDisponibilitiesInfo = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')
  const { available } = useNbDisponibility(place.disponibilities)
  const { coming, past, pending } = useNbBooking(place.disponibilities)

  return (
    <VStack alignItems="flex-start" width="100%">
      <HStack borderBottom="1px solid" borderColor={'gray.100'} width="100%">
        <Box
          width="auto"
          borderLeft="1px solid"
          borderRight="1px solid"
          borderTop={{ base: '1px solid', md: 'none' }}
          borderColor={'gray.100'}
          paddingX={6}
          paddingY={2}
        >
          <Text>{t('list.solidarity_slots')}</Text>
        </Box>
      </HStack>

      <VStack alignItems="flex-start" spacing={0} width="100%">
        {/* Disponibilities */}
        <HStack
          alignItems="flex-start"
          spacing={4}
          borderBottom="1px solid"
          borderColor="gray.100"
          paddingY={2}
          width="100%"
        >
          <Text
            color="gray.500"
            flex={1}
            as={Link}
            href={{
              pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
              query: { id: place.slug, index: 2 },
            }}
          >
            <Text color="gray.500">{t('list.disponibility')}</Text>
          </Text>

          <Box flex={2}>
            <Box>
              {available.length > 0 ? (
                <Text>
                  {t(`list.available${available.length > 1 ? 's' : ''}`, {
                    nb: available.length,
                  })}
                </Text>
              ) : (
                <Text color="red.600">{t('list.noDisponibility')}</Text>
              )}
            </Box>
            {Boolean(place.filledUntil) && (
              <Text>
                {t(`list.filledUntil`, {
                  date: format(place.filledUntil),
                })}
              </Text>
            )}
            {!Boolean(place.filledUntil) && !Boolean(place.published) && (
              <Text pt={2} color="red.600" fontSize="sm">
                {t('list.needDispo')}
              </Text>
            )}
          </Box>
        </HStack>

        {/* Requests */}
        <HStack
          width="100%"
          alignItems="stretch"
          spacing={4}
          borderBottom="1px solid"
          borderColor="gray.100"
          paddingY={3}
        >
          <Box flex={1}>
            <Text
              color="gray.500"
              as={Link}
              href={{
                pathname: ROUTE_ACCOUNT_REQUEST,
              }}
            >
              {t('list.requests')}
            </Text>
          </Box>

          <Box flex={2}>
            {pending.length > 0 ? (
              <Link href={ROUTE_ACCOUNT_REQUEST}>
                <Tag status={DisponibilityStatus.PENDING}>
                  {t('list.nbPending', { nb: pending.length })}
                </Tag>
              </Link>
            ) : (
              <NoContent />
            )}
          </Box>
        </HStack>

        {/* Bookings */}
        <HStack alignItems="stretch" width="100%" spacing={4} paddingY={3}>
          <Text
            color="gray.500"
            flex={1}
            as={Link}
            href={{
              pathname: ROUTE_ACCOUNT_BOOKING,
            }}
          >
            {t('list.bookings')}
          </Text>

          <Box flex={2}>
            {coming.length > 0 || past.length > 0 ? (
              <HStack spacing={2.5}>
                {coming.length > 0 && (
                  <Tag status={DisponibilityStatus.BOOKED}>
                    {t('list.nbBooking', { nb: coming.length })}
                  </Tag>
                )}
                {true && (
                  <Tag status={DisponibilityStatus.PAST}>
                    {t('list.nbPassed', { nb: past.length })}
                  </Tag>
                )}
              </HStack>
            ) : (
              <NoContent />
            )}
          </Box>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default PlaceDisponibilitiesInfo

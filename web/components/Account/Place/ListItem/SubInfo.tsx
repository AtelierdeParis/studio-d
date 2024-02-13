import React from 'react'
import Link from '~components/Link'
import Tag from '~components/Tag'
import {
  Box,
  Button,
  Text,
  Flex,
  Divider,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { DisponibilityStatus } from '~@types/disponibility.d'
import useNbBooking from '~hooks/useNbBooking'
import {
  ROUTE_ACCOUNT_PLACE_DETAIL,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'
import { useTranslation } from 'next-i18next'
import { format } from '~utils/date'

const SubInfo = ({ place, available, isMobile = false, isComplete = true }) => {
  const { t } = useTranslation('place')
  const { coming, past, pending } = useNbBooking(place.disponibilities)

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      pt={{ base: 4, lg: 0 }}
      spacing={{ base: 3, lg: 0 }}
    >
      <Box flex={1} fontSize={{ base: 'sm', sm: 'md' }}>
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.disponibility')}
          </Text>
          {isComplete && (
            <Button
              as={Link}
              href={{
                pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                query: { id: place.slug, index: 2 },
              }}
              variant="line"
            >
              {available.length > 0 ? t('list.edit') : t('list.add')}
            </Button>
          )}
        </Flex>
        <Box>
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
          {place.filledUntil ? (
            <Text>
              {t(`list.filledUntil`, {
                date: format(place.filledUntil),
              })}
            </Text>
          ) : (
            <Text pt={2} color="red.600" fontSize="sm">
              {t('list.needDispo')}
            </Text>
          )}
        </Box>
      </Box>
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        mx={5}
        opacity={0.5}
        display={{ base: 'none', md: 'block', lg: 'none', xl: 'block' }}
      />
      <Box
        flex={1}
        display={{ base: 'none', md: 'block', lg: 'none', xl: 'block' }}
      >
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.requests')}
          </Text>
          {pending.length > 0 && (
            <Button as={Link} href={ROUTE_ACCOUNT_REQUEST} variant="line">
              {t('list.see')}
            </Button>
          )}
        </Flex>
        <Box pt={2}>
          {pending.length > 0 ? (
            <Tag status={DisponibilityStatus.PENDING}>
              {t('list.nbPending', { nb: pending.length })}
            </Tag>
          ) : (
            <Divider w="14px" />
          )}
        </Box>
      </Box>
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        mx={5}
        display={{ base: 'none', md: 'block' }}
        opacity={0.5}
      />
      <Box flex={1} display={{ base: 'none', md: 'block' }}>
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.bookings')}
          </Text>
          {(coming.length > 0 || past.length > 0) && (
            <Button as={Link} href={ROUTE_ACCOUNT_BOOKING} variant="line">
              {t('list.see')}
            </Button>
          )}
        </Flex>
        <Box pt={2}>
          {coming.length > 0 || past.length > 0 ? (
            <HStack spacing={2.5}>
              {coming.length > 0 && (
                <Tag status={DisponibilityStatus.BOOKED}>
                  {t('list.nbBooking', { nb: coming.length })}
                </Tag>
              )}
              {past.length && (
                <Tag status={DisponibilityStatus.PAST}>
                  {t('list.nbPassed', { nb: past.length })}
                </Tag>
              )}
            </HStack>
          ) : (
            <Divider w="14px" />
          )}
        </Box>
      </Box>
    </Stack>
  )
}

export default SubInfo

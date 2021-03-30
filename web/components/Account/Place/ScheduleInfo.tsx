import React, { useMemo } from 'react'
import { Flex, Box, Text, Button, VStack, Tag, HStack } from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_ACCOUNT_BOOKING } from '~constants'
import { useTranslation } from 'next-i18next'
import ScheduleAbout from '~components/Account/Place/ScheduleAbout'
import ScheduleFilledUntil from '~components/Account/Place/ScheduleFilledUntil'
import { Place } from '~@types/place'
import { DisponibilityStatus } from '~@types/disponibility.d'

interface IScheduleInfo {
  place: Place
  showForm: () => void
}

const ScheduleInfo = ({ place, showForm }: IScheduleInfo) => {
  const { t } = useTranslation('place')

  const { nbDispo, available, booked, pending, past } = useMemo(
    () =>
      place?.disponibilities.reduce(
        (total, current) => {
          switch (current.status) {
            case DisponibilityStatus.AVAILABLE:
              total.available.push(current)
              break
            case DisponibilityStatus.PAST:
              total.past.push(current)
              break
            case DisponibilityStatus.BOOKED:
              total.booked.push(current)
              break
            case DisponibilityStatus.PENDING:
              total.pending.push(current)
              break
          }

          return total
        },
        {
          nbDispo: place?.disponibilities.length || 0,
          available: [],
          booked: [],
          pending: [],
          past: [],
        },
      ),
    [place?.disponibilities],
  )

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box flex={1}>
          <Text fontFamily="mabry medium" fontSize="3xl" lineHeight="1">
            {nbDispo}
          </Text>
          <Text>{t(`schedule.slotsFilled${nbDispo > 1 ? 's' : ''}`)}</Text>
          {/* TODO: Display calcul from bookings */}
          <Text color="gray.400">
            {t(`schedule.available${nbDispo > 1 ? 's' : ''}`, {
              nb: available.length,
            })}
          </Text>
          <Button size="lg" mt={6} onClick={showForm}>
            {t(`schedule.add`)}
          </Button>
        </Box>
        <VStack pl={4} spacing={8} flex={1} alignItems="flex-start">
          <ScheduleFilledUntil place={place} />
          <Box>
            <Flex pb={1.5}>
              <Text color="gray.400" mr={1.5}>
                {t('schedule.requests')}
              </Text>
              <Link
                href={ROUTE_ACCOUNT_REQUEST}
                textDecoration="underline"
                fontFamily="mabry medium"
              >
                {t('schedule.see')}
              </Link>
            </Flex>
            {/* TODO: Display number from requests */}
            <Tag bgColor="tag.yellow">
              {t('schedule.nbPending', { nb: pending.length })}
            </Tag>
          </Box>
          <Box>
            <Flex pb={1.5}>
              <Text color="gray.400" mr={1.5}>
                {t('schedule.bookings')}
              </Text>
              <Link
                href={ROUTE_ACCOUNT_BOOKING}
                textDecoration="underline"
                fontFamily="mabry medium"
              >
                {t('schedule.see')}
              </Link>
            </Flex>
            {/* TODO: Display number from bookings */}
            <HStack alignItems="center" spacing={2.5}>
              <Tag bgColor="tag.green">
                {t('schedule.nbComing', { nb: booked.length })}
              </Tag>
              <Tag bgColor="tag.grey">
                {t('schedule.nbPassed', { nb: past.length })}
              </Tag>
            </HStack>
          </Box>
        </VStack>
      </Flex>
      <ScheduleAbout place={place} />
    </Box>
  )
}

export default ScheduleInfo

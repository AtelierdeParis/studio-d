import React, { useMemo } from 'react'
import { Flex, Box, Text, Button, VStack, Tag, HStack } from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_ACCOUNT_BOOKING } from '~constants'
import { useTranslation } from 'next-i18next'
import ScheduleAbout from '~components/Account/Place/ScheduleAbout'
import ScheduleFilledUntil from '~components/Account/Place/ScheduleFilledUntil'
import { Place } from '~@types/place'

interface IScheduleInfo {
  place: Place
  showForm: () => void
}

const ScheduleInfo = ({ place, showForm }: IScheduleInfo) => {
  const { t } = useTranslation('place')

  const { nbDispo } = useMemo(() => {
    return {
      nbDispo: place?.disponibilities?.length || 0,
      nbAvailable: 0,
    }
  }, [place?.disponibilities])

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
            {t(`schedule.available${nbDispo > 1 ? 's' : ''}`, { nb: nbDispo })}
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
            <Tag bgColor="tag.yellow">{t('schedule.nbPending', { nb: 0 })}</Tag>
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
              <Tag bgColor="tag.green">{t('schedule.nbComing', { nb: 0 })}</Tag>
              <Tag bgColor="tag.grey">{t('schedule.nbPassed', { nb: 0 })}</Tag>
            </HStack>
          </Box>
        </VStack>
      </Flex>
      <ScheduleAbout place={place} />
    </Box>
  )
}

export default ScheduleInfo

import React from 'react'
import { Flex, Box, Text, Button, VStack, Tag, HStack } from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_ACCOUNT_BOOKING } from '~constants'
import ScheduleFilledUntil from '~components/Account/Place/ScheduleFilledUntil'
import { Espace } from '~typings/api'
import useNbBooking from '~hooks/useNbBooking'
import { useTranslation } from 'next-i18next'

interface Props {
  place: Espace
}

const ScheduleRecap = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const { coming, past, pending } = useNbBooking(place?.disponibilities)
  return (
    <VStack
      pl={{ base: 0, schedule: 4 }}
      spacing={{ base: 3, schedule: 8 }}
      flex={1}
      alignItems="flex-start"
    >
      <ScheduleFilledUntil place={place} />
      <Box>
        <Flex pb={1.5} alignItems="center">
          <Text color="gray.400" mr={1.5} fontSize={{ base: 'sm', sm: 'md' }}>
            {t('schedule.requests')}
          </Text>
          {pending.length > 0 && (
            <Button
              as={Link}
              variant="line"
              href={ROUTE_ACCOUNT_REQUEST}
              fontFamily="mabry medium"
            >
              {t('schedule.see')}
            </Button>
          )}
        </Flex>
        <Tag bgColor="tag.yellow">
          {t('schedule.nbPending', { nb: pending.length })}
        </Tag>
      </Box>
      <Box>
        <Flex pb={1.5} alignItems="center">
          <Text color="gray.400" mr={1.5} fontSize={{ base: 'sm', sm: 'md' }}>
            {t('schedule.bookings')}
          </Text>
          {coming.length > 0 ||
            (past.length > 0 && (
              <Button
                as={Link}
                variant="line"
                href={ROUTE_ACCOUNT_BOOKING}
                fontFamily="mabry medium"
              >
                {t('schedule.see')}
              </Button>
            ))}
        </Flex>
        <HStack alignItems="center" spacing={2.5}>
          <Tag bgColor="tag.green">
            {t('schedule.nbComing', { nb: coming.length })}
          </Tag>
          <Tag bgColor="tag.grey">
            {t('schedule.nbPassed', { nb: past.length })}
          </Tag>
        </HStack>
      </Box>
    </VStack>
  )
}

export default ScheduleRecap

import React from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  VStack,
  Tag,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_ACCOUNT_BOOKING } from '~constants'
import { useTranslation } from 'next-i18next'
import ScheduleAbout from '~components/Account/Place/ScheduleAbout'
import ScheduleFilledUntil from '~components/Account/Place/ScheduleFilledUntil'
import { Espace } from '~typings/api'
import useNbDisponibility from '~hooks/useNbDisponibility'
import useNbBooking from '~hooks/useNbBooking'

interface IScheduleInfo {
  place: Espace
  showForm: () => void
}

const ScheduleInfo = ({ place, showForm }: IScheduleInfo) => {
  const { t } = useTranslation('place')

  const { nbDispo, available } = useNbDisponibility(place?.disponibilities)
  const { coming, past, pending } = useNbBooking(place?.disponibilities)
  const isLarge = useBreakpointValue({ base: false, xl: true })
  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <Box w="100%">
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex
          w="100%"
          direction={{ base: 'row', sm: 'column' }}
          flex={1}
          justifyContent="space-between"
        >
          <Box>
            <Text fontFamily="mabry medium" fontSize="3xl" lineHeight="1">
              {nbDispo}
            </Text>
            <Text>{t(`schedule.slotsFilled${nbDispo > 1 ? 's' : ''}`)}</Text>
            <Text color="gray.400">
              {t(`schedule.available${nbDispo > 1 ? 's' : ''}`, {
                nb: available.length,
              })}
            </Text>
          </Box>
          <Button size="lg" alignSelf="flex-start" mt={6} onClick={showForm}>
            {isMobile ? t(`list.add`) : t(`schedule.add`)}
          </Button>
        </Flex>
        <VStack
          pl={{ base: 0, sm: 4 }}
          spacing={{ base: 4, md: 8 }}
          flex={1}
          pt={{ base: 6, sm: 0 }}
          alignItems="flex-start"
        >
          <ScheduleFilledUntil place={place} />
          <Box>
            <Flex pb={1.5} alignItems="center">
              <Text
                color="gray.400"
                mr={1.5}
                fontSize={{ base: 'sm', sm: 'md' }}
              >
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
              <Text
                color="gray.400"
                mr={1.5}
                fontSize={{ base: 'sm', sm: 'md' }}
              >
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
      </Flex>
      {isLarge && <ScheduleAbout place={place} />}
    </Box>
  )
}

export default ScheduleInfo

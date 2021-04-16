import React from 'react'
import { Booking } from '~typings/api'
import { format } from '~utils/date'
import { getHistoryInfo } from '~utils/message'
import { VStack, Circle, Flex, Text } from '@chakra-ui/react'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'

interface Props {
  booking: Booking
  type: 'company' | 'place'
}

const BookingHistory = ({ booking, type }: Props) => {
  const { t } = useTranslation('booking')

  return (
    <VStack spacing={5} alignItems="flex-start">
      {booking?.messages
        .filter((message) => message.status !== 'message')
        // @ts-ignore
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(({ id, status, created_at }) => {
          const { color, colorCircle, text } = getHistoryInfo(
            status,
            booking,
            type,
          )
          const target =
            type === 'place' ? booking.company.id : booking.place.id

          return (
            <Flex key={id} alignItems="flex-start">
              <Circle size="6px" bgColor={colorCircle} mt={1.5} />
              <Flex pl={4} direction="column">
                <Text color={color} fontFamily="mabry medium" fontWeight="500">
                  {format(created_at, 'd MMMM yyyy')}
                </Text>
                <Text>
                  {text}
                  {['askcancel', 'created'].includes(status) && (
                    <Link
                      ml={2}
                      textDecoration="underline"
                      href={`${ROUTE_ACCOUNT_MESSAGE}?conversation=${target}`}
                      as={`${ROUTE_ACCOUNT_MESSAGE}/${target}`}
                    >
                      {t('seeMessage')}
                    </Link>
                  )}
                </Text>
              </Flex>
            </Flex>
          )
        })}
    </VStack>
  )
}

export default BookingHistory

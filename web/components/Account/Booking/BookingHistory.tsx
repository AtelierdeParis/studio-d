import React from 'react'
import { Booking } from '~typings/api'
import { format } from '~utils/date'
import { getHistoryInfo } from '~utils/message'
import { VStack, Circle, Flex, Text, Box } from '@chakra-ui/react'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'

interface Props {
  booking: Booking
  userType: 'company' | 'place'
  bookingType: 'request' | 'booking'
}

const BookingHistory = ({ booking, userType, bookingType }: Props) => {
  const { t } = useTranslation('booking')

  return (
    <Box w="100%" pt={{ base: 5, md: 0 }} mb={10}>
      <Text
        fontFamily="mabry medium"
        fontWeight="500"
        mb={4}
        display={{ base: 'block', md: 'none' }}
      >
        {t('activities')}
      </Text>
      <VStack spacing={5} alignItems="flex-start">
        {booking?.messages
          .filter((message) => message.status !== 'message')
          // @ts-ignore
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(({ id, status, created_at, disponibilities }) => {
            const { color, colorCircle, text } = getHistoryInfo(
              status,
              booking,
              userType,
              bookingType,
              disponibilities,
            )
            const target =
              userType === 'place' ? booking.company.id : booking.place.id

            return (
              <Flex key={id} alignItems="flex-start">
                <Circle size="6px" bgColor={colorCircle} mt={1.5} />
                <Flex pl={4} direction="column">
                  <Text
                    color={color}
                    fontFamily="mabry medium"
                    fontWeight="500"
                  >
                    {format(created_at, 'd MMMM yyyy')}
                  </Text>
                  <Text fontSize={{ base: 'sm', sm: 'md' }}>
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
    </Box>
  )
}

export default BookingHistory

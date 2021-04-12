import React, { useMemo } from 'react'
import { Booking } from '~typings/api'
import { format } from '~utils/date'
import { ROUTE_ACCOUNT_MESSAGE_DETAIL } from '~constants'
import Link from '~components/Link'
import { VStack, Circle, Flex, Text } from '@chakra-ui/react'
import { Trans } from 'next-i18next'
import isSameDay from 'date-fns/isSameDay'

interface Props {
  booking: Booking
}

const getCreatedText = (booking) => {
  const { disponibilities: dispos } = booking
  const components = {
    a: (
      <Link
        textDecoration="underline"
        href={{
          pathname: ROUTE_ACCOUNT_MESSAGE_DETAIL,
          query: { id: booking?.id },
        }}
      />
    ),
  }

  if (dispos.length > 1) {
    return (
      <Trans i18nKey="booking:history.created.many" components={components} />
    )
  }
  if (isSameDay(new Date(dispos[0].start), new Date(dispos[0].end))) {
    return (
      <Trans
        i18nKey="booking:history.created.day"
        components={components}
        values={{
          date: format(dispos[0].start, 'd MMMM yyyy'),
        }}
      />
    )
  }

  return (
    <Trans
      i18nKey="booking:history.created.day"
      components={components}
      values={{
        start: format(dispos[0].start, 'd MMMM yyyy'),
        end: format(dispos[0].end, 'd MMMM yyyy'),
      }}
    />
  )
}

const getHistoryInfo = (status, booking) => {
  switch (status) {
    case 'accepted':
      return {
        color: 'green.500',
        text: <Trans i18nKey="booking:history.accepted" />,
      }
    case 'created':
      return { color: 'gray.300', text: getCreatedText(booking) }
    case 'askcancel':
      return {
        color: 'red.600',
        text: (
          <Trans
            i18nKey="booking:history.askcancel"
            components={{
              a: (
                <Link
                  textDecoration="underline"
                  href={{
                    pathname: ROUTE_ACCOUNT_MESSAGE_DETAIL,
                    query: { id: booking?.id },
                  }}
                />
              ),
            }}
          />
        ),
      }
    case 'canceled':
      return {
        color: 'red.600',
        text: <Trans i18nKey="booking:history.canceledByYou" />,
      }
    case 'canceledbyplace':
      return {
        color: 'red.600',
        text: <Trans i18nKey="booking:history.canceledByPlace" />,
      }
  }
}

const BookingHistory = ({ booking }: Props) => {
  return (
    <VStack spacing={5} alignItems="flex-start">
      {booking?.histories
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(({ id, status, created_at }) => {
          const { color, text } = getHistoryInfo(status, booking)
          return (
            <Flex key={id} alignItems="flex-start">
              <Circle size="6px" bgColor={color} mt={1.5} />
              <Flex pl={4} direction="column">
                <Text color={color} fontFamily="mabry medium" fontWeight="500">
                  {format(created_at, 'd MMMM yyyy')}
                </Text>
                <Text>{text}</Text>
              </Flex>
            </Flex>
          )
        })}
    </VStack>
  )
}

export default BookingHistory

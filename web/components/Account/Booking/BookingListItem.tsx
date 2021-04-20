import React, { Fragment, useMemo } from 'react'
import { format } from '~utils/date'
import Message from 'public/assets/img/message.svg'
import Tag from '~components/Tag'
import Link from '~components/Link'
import { Booking } from '~typings/api'
import { Circle, Text, Flex, Button, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import isSameDay from 'date-fns/isSameDay'
import useIsOccupied from '~hooks/useIsOccupied'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface Props {
  booking: Booking
  onSelect: (bookingId: string) => void
}

const BookingListItem = ({ booking, onSelect }: Props) => {
  const { data: user } = useCurrentUser()
  const target =
    user?.type === 'place' ? booking?.company?.id : booking?.place?.id
  const { t } = useTranslation('booking')
  const isOccupied = useIsOccupied(booking?.disponibilities, booking?.status)

  const status = useMemo(() => {
    if (isOccupied) return 'occupied'
    return booking.status
  }, [booking, isOccupied])

  return (
    <Fragment key={booking?.id}>
      <Cell status={status}>
        <Text>{booking?.id}</Text>
      </Cell>
      <Cell status={status} fullOpacity>
        <Tag status={status} />
      </Cell>
      <Cell status={status}>
        <Text isTruncated>{booking?.espace?.name}</Text>
      </Cell>
      <Cell status={status}>
        <Text isTruncated>
          {user.type === 'place'
            ? booking?.company?.structureName
            : booking?.place?.structureName}
        </Text>
      </Cell>
      <Cell status={status}>
        <Flex direction="column">
          {booking?.disponibilities.map((dispo) => (
            <Flex
              py={0.5}
              alignItems="center"
              whiteSpace="nowrap"
              key={dispo.id}
            >
              <Text>{format(dispo.start, 'd MMM yyyy')}</Text>
              {!isSameDay(new Date(dispo.end), new Date(dispo.start)) && (
                <Text pl={1.5}>
                  {' - '}
                  {format(dispo.end, 'd MMM yyyy')}
                </Text>
              )}
              {dispo.when && (
                <Text textTransform="lowercase" pl={1.5}>
                  {`(${t(`${dispo.when}`)})`}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Cell>
      <Cell status={status} fullOpacity>
        <Box pos="relative">
          <Button
            px={2}
            py={1}
            variant="outline"
            color="grayText.1"
            colorScheme="gray"
            size="sm"
            borderRadius="sm"
            fontSize="md"
            onClick={() => onSelect(booking.id)}
          >
            {t('detail')}
          </Button>
          {(booking?.notifications?.booking > 0 ||
            booking?.notifications?.request > 0) && (
            <Circle
              bgColor="orange.500"
              size="6px"
              pos="absolute"
              top="-2px"
              right="-2px"
            />
          )}
        </Box>
        <Link
          href={`${ROUTE_ACCOUNT_MESSAGE}?conversation=${target}`}
          as={`${ROUTE_ACCOUNT_MESSAGE}/${target}`}
        >
          <Box
            pl={3}
            pos="relative"
            opacity={['canceled', 'canceledbyplace'].includes(status) ? 0.2 : 1}
          >
            {booking?.notifications?.message > 0 && (
              <Circle
                bgColor="orange.500"
                size="6px"
                pos="absolute"
                top="0"
                right="0"
              />
            )}
            <Message />
          </Box>
        </Link>
      </Cell>
    </Fragment>
  )
}

export default BookingListItem

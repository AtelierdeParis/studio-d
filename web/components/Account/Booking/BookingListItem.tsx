import React, { Fragment, useMemo } from 'react'
import { format } from '~utils/date'
import Message from 'public/assets/img/message.svg'
import Tag from '~components/Tag'
import { Booking } from '~typings/api'
import { Circle, Text, Flex, Button, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Cell from '~components/Account/Booking/Cell'
import max from 'date-fns/max'
import isPast from 'date-fns/isPast'
import isSameDay from 'date-fns/isSameDay'
import useIsOccupied from '~hooks/useIsOccupied'

interface Props {
  booking: Booking
  onSelect: (bookingId: string) => void
}

const BookingListItem = ({ booking, onSelect }: Props) => {
  const { t } = useTranslation('booking')
  const { id, disponibilities, place } = booking
  const isOccupied = useIsOccupied(booking?.disponibilities, booking?.status)

  const status = useMemo(() => {
    if (isOccupied) return 'occupied'
    if (
      isPast(max(booking.disponibilities.map((dispo) => new Date(dispo.end))))
    ) {
      return 'past'
    }
    return booking.status
  }, [booking, isOccupied])

  return (
    <Fragment key={id}>
      <Cell status={status}>
        <Text>{id}</Text>
      </Cell>
      <Cell status={status} fullOpacity>
        <Tag status={status} />
      </Cell>
      <Cell status={status}>
        <Text isTruncated>
          {disponibilities.length > 0 ? disponibilities[0].espace.name : '-'}
        </Text>
      </Cell>
      <Cell status={status}>
        <Text isTruncated>{place.structureName}</Text>
      </Cell>
      <Cell status={status}>
        <Flex direction="column">
          {disponibilities.map((dispo) => (
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
        <Button
          px={2}
          py={1}
          variant="outline"
          color="grayText.1"
          colorScheme="gray"
          size="sm"
          borderRadius="sm"
          fontSize="md"
          //   @ts-ignore
          onClick={() => onSelect(booking.id)}
        >
          {t('detail')}
        </Button>
        <Box
          pl={3}
          pos="relative"
          opacity={['canceled', 'canceledbyplace'].includes(status) ? 0.2 : 1}
        >
          {/* TODO: handle notif */}
          <Circle
            bgColor="orange.500"
            size="6px"
            pos="absolute"
            top="0"
            right="0"
          />
          <Message />
        </Box>
      </Cell>
    </Fragment>
  )
}

export default BookingListItem

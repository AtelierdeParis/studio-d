import React, { Fragment, useState } from 'react'
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Divider as ChakraDivider,
  Button,
  Circle,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Booking } from '~typings/api'
import { format } from '~utils/date'
import Tag from '~components/Tag'
import { BookingStatus } from '~@types/booking'
import Message from 'public/assets/img/message.svg'
import BookingDrawer from '~components/Account/Booking/BookingDrawer'

const canceledStyle = {
  opacity: 0.2,
}

interface Props {
  bookings: Booking[]
  type: 'request' | 'booking'
}

const Divider = () => <ChakraDivider orientation="vertical" h="24px" mr={2.5} />

const Cell = ({
  children,
  status = null,
  fullOpacity = false,
  isHeader = false,
}) => {
  return (
    <Flex
      alignItems="center"
      py="2.5"
      pl="5"
      pr="2"
      lineHeight="1"
      borderBottom="1px solid"
      borderColor="gray.100"
      {...(isHeader && {
        bgColor: 'blue.100',
        color: 'grayText.1',
        pl: 2.5,
        borderBottom: 'none',
      })}
    >
      <Flex
        {...(status === 'canceled' && !fullOpacity && canceledStyle)}
        w="100%"
        alignItems="center"
      >
        {children}
      </Flex>
    </Flex>
  )
}

const BookingList = ({ bookings, type }: Props) => {
  const { t } = useTranslation('booking')
  const [selected, setSelected] = useState<Booking>(null)

  const onSelect = (booking) => {
    if (!selected || selected.id !== booking.id) {
      setSelected(booking)
    }
  }

  return (
    <Box>
      <BookingDrawer booking={selected} setSelected={setSelected} />
      <Flex alignItems="center" pt={8} pb={4}>
        <Text textStyle="accountTitle" pl={4}>
          {t(`${type}.title`)}
        </Text>
      </Flex>
      <SimpleGrid gridTemplateColumns="fit-content(300px) fit-content(300px) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) fit-content(300px)">
        <Cell isHeader>
          <Text>{t('nb')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('status')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('place')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('structure')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('date')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('activity')}</Text>
        </Cell>
        {bookings.map((booking) => {
          const { id, disponibilities, place, status } = booking
          return (
            <Fragment key={id}>
              <Cell status={status}>
                <Text>{id}</Text>
              </Cell>
              <Cell status={status} fullOpacity>
                <Tag status={status as BookingStatus} />
              </Cell>
              <Cell status={status}>
                <Text isTruncated>
                  {disponibilities.length > 0
                    ? disponibilities[0].espace.name
                    : '-'}
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
                      {dispo.end !== dispo.start && (
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
                  onClick={() => onSelect(booking)}
                >
                  {t('detail')}
                </Button>
                <Box
                  pl={3}
                  pos="relative"
                  opacity={status === 'canceled' ? 0.2 : 1}
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
        })}
      </SimpleGrid>
    </Box>
  )
}

export default BookingList

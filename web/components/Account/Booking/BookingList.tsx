import React, { useState } from 'react'
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Divider as ChakraDivider,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Booking } from '~typings/api'
import BookingSearch from '~components/Account/Booking/BookingSearch'
import Chevron from 'public/assets/img/chevron-down.svg'
import BookingDrawer from '~components/Account/Booking/BookingDrawer'
import BookingListItem from '~components/Account/Booking/BookingListItem'
import Cell from '~components/Account/Booking/Cell'

interface Props {
  bookings: Booking[]
  type: 'request' | 'booking'
}

const Divider = () => <ChakraDivider orientation="vertical" h="24px" mr={2.5} />

const BookingList = ({ bookings, type }: Props) => {
  const { t } = useTranslation('booking')
  const [selected, setSelected] = useState<Booking>(null)
  const [list, setList] = useState<Booking[]>(bookings)
  const [isDesc, setDesc] = useState<boolean>(true)

  const onSelect = (booking) => {
    if (!selected || selected.id !== booking.id) {
      setSelected(booking)
    }
  }

  const sortByDate = () => {
    setDesc(!isDesc)
    setList(list.reverse())
  }

  return (
    <Box>
      <BookingDrawer booking={selected} setSelected={setSelected} />
      <Flex alignItems="center" pt={8} pb={4} justifyContent="space-between">
        <Text textStyle="accountTitle" pl={4}>
          {t(`${type}.title`)}
        </Text>
        <BookingSearch bookings={list} setBookings={setList} />
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
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            cursor="pointer"
            onClick={sortByDate}
          >
            <Text color="black">{t('date')}</Text>
            <Box transform={`rotate(${isDesc ? '0' : '180'}deg)`}>
              <Chevron />
            </Box>
          </Flex>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('activity')}</Text>
        </Cell>
        {list.map((booking) => (
          <BookingListItem booking={booking} onSelect={onSelect} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default BookingList

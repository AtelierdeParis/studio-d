import React, { useEffect, useState } from 'react'
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Divider as ChakraDivider,
  DividerProps,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Booking } from '~typings/api'
import BookingSearch from '~components/Account/Booking/BookingSearch'
import Chevron from 'public/assets/img/chevron-down.svg'
import BookingDrawer from '~components/Account/Booking/BookingDrawer'
import BookingListItem from '~components/Account/Booking/BookingListItem'
import Cell from '~components/Account/Booking/Cell'
import { useRouter } from 'next/router'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface Props {
  bookings: Booking[]
  type: 'request' | 'booking'
}

const Divider = (props: DividerProps) => (
  <ChakraDivider orientation="vertical" h="24px" mr={2.5} {...props} />
)

const BookingList = ({ bookings, type }: Props) => {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const { t } = useTranslation('booking')
  const [selected, setSelected] = useState<string>(
    (router?.query?.id as string) || null,
  )
  const [list, setList] = useState<Booking[]>([])
  const [isDesc, setDesc] = useState<boolean>(true)

  useEffect(() => {
    setList(bookings)
    setDesc(true)
  }, [bookings])

  const onSelect = (bookingId) => {
    if (!selected || selected !== bookingId) {
      setSelected(bookingId)
    }
  }

  const sortByDate = () => {
    setDesc(!isDesc)
    setList(list.reverse())
  }

  return (
    <Box>
      {selected && (
        <BookingDrawer
          bookingId={selected}
          setSelected={setSelected}
          type={type}
        />
      )}
      <Flex
        alignItems="center"
        pt={{ base: 4, md: 8 }}
        pb={4}
        justifyContent={{ base: 'flex-end', md: 'space-between' }}
      >
        <Text
          textStyle="accountTitle"
          pl={4}
          display={{ base: 'none', md: 'block' }}
        >
          {t(`${type}.title`)}
        </Text>
        <BookingSearch bookings={bookings} setBookings={setList} />
      </Flex>
      <SimpleGrid
        gridTemplateColumns={{
          base: 'minmax(auto, auto) minmax(auto, auto)',
          lg:
            'fit-content(300px) fit-content(300px) minmax(auto, auto) minmax(auto, auto) fit-content(300px)',
          xl:
            'fit-content(300px) fit-content(300px) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) fit-content(300px)',
        }}
      >
        <Cell isHeader display={{ base: 'none', lg: 'flex' }}>
          <Text pl="9px">{t('ref')}</Text>
        </Cell>
        <Cell isHeader display={{ base: 'none', lg: 'flex' }}>
          <Divider />
          <Text>{t('status')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider display={{ base: 'none', lg: 'block' }} />
          <Text>{t('place')}</Text>
        </Cell>
        <Cell isHeader display={{ base: 'none', xl: 'flex' }}>
          <Divider />
          <Text>{t(user?.type === 'place' ? 'company' : 'structure')}</Text>
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
        <Cell isHeader display={{ base: 'none', lg: 'flex' }}>
          <Divider />
          <Text>{t('activity')}</Text>
        </Cell>
        {list.map((booking) => (
          <BookingListItem
            key={booking.id}
            booking={booking}
            onSelect={onSelect}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default BookingList

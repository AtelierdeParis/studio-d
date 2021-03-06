import React, { useMemo } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Message from 'public/assets/img/message.svg'
import Tag from '~components/Tag'
import Link from '~components/Link'
import UrlRewrite from '~components/UrlRewrite'
import {
  ROUTE_PLACE_DETAIL,
  ROUTE_ACCOUNT_MESSAGE,
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_ACCOUNT_BOOKING,
} from '~constants'
import { format, orderByDate } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import { BookingStatus } from '~@types/booking.d'
import Loading from '~components/Loading'
import Notif from '~components/Notif'
import BookingHistory from '~components/Account/Booking/BookingHistory'
import CancelModal from '~components/Account/Booking/CancelModal'
import AskCancelModal from '~components/Account/Booking/AskCancelModal'
import RemoveDispoModal from '~components/Account/Booking/RemoveDispoModal'
import ConfirmModal from '~components/Account/Booking/ConfirmModal'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useBooking } from '~hooks/useBooking'
import useIsOccupied from '~hooks/useIsOccupied'
import { client } from '~api/client-api'
import { useQueryClient } from 'react-query'
import { useMyNotifications } from '~hooks/useMyNotifications'
import BookingDrawerCompany from '~components/Account/Booking/BookingDrawerCompany'
import BookingDrawerPlace from '~components/Account/Booking/BookingDrawerPlace'
import { NextSeo } from 'next-seo'

interface Props {
  bookingId: string
  setSelected: (bookingId: string) => void
  type: 'request' | 'booking'
}

const BookingDrawer = ({ bookingId, setSelected, type }: Props) => {
  const queryClient = useQueryClient()
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: booking, isLoading } = useBooking(bookingId, {
    onSuccess: ({ id }) => {
      client.notifications
        .toggleNotif({ status: type, bookingId: id })
        .then(() => {
          queryClient.refetchQueries(['myNotifications'])
          queryClient.refetchQueries(['myBookings', type])
        })
    },
  })
  const { t } = useTranslation('booking')
  const target =
    user?.type === 'place' ? booking?.company?.id : booking?.place?.id
  const { data: notifs } = useMyNotifications({ target })
  const isOccupied = useIsOccupied(booking?.disponibilities, booking?.status)
  const status = useMemo(() => {
    if (isOccupied) return 'occupied'
    return booking?.status
  }, [booking, isOccupied])

  return (
    <Drawer
      isOpen={Boolean(bookingId)}
      placement="right"
      onClose={() => {
        setSelected(null)
      }}
      size="xl"
    >
      <NextSeo
        title={t(type === 'request' ? 'requestNb' : 'bookingNb', {
          nb: booking?.id,
        })}
      />
      <DrawerOverlay bgColor="rgb(255 255 255 / 67%)">
        <DrawerContent>
          <Loading isLoading={isLoading || userLoading} isCentered>
            <UrlRewrite
              id={bookingId}
              path={
                type === 'request'
                  ? ROUTE_ACCOUNT_REQUEST
                  : ROUTE_ACCOUNT_BOOKING
              }
            />
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex>
                <Text
                  pr={4}
                  fontSize="xl"
                  fontFamily="mabry medium"
                  fontWeight="500"
                >
                  {t(type === 'request' ? 'requestNb' : 'bookingNb', {
                    nb: booking?.id,
                  })}
                </Text>
                <Tag status={status} alignSelf="center" />
              </Flex>
            </DrawerHeader>
            <DrawerBody display="flex" flexDirection="column">
              <Flex pb={5} direction={{ base: 'column', md: 'row' }}>
                <Box
                  flex={1}
                  borderBottom="1px solid"
                  pb={{ base: 4, md: 0 }}
                  mb={{ base: 4, md: 0 }}
                  borderColor={{ base: 'gray.50', md: 'transparent' }}
                >
                  <Text fontFamily="mabry medium" fontWeight="500">
                    {t('date')}
                  </Text>
                  <Box>
                    {orderByDate(booking?.disponibilities, 'start').map(
                      (dispo) => (
                        <Box
                          fontSize="sm"
                          key={dispo.id}
                          color={
                            dispo.status === 'removed' ? 'gray.400' : 'black'
                          }
                          textDecoration={
                            dispo.status === 'removed' ? 'line-through' : 'none'
                          }
                        >
                          {dispo.type === 'period' ? (
                            <>
                              <Box as="span">
                                {`${format(dispo.start, 'd')} - ${format(
                                  dispo.end,
                                  'd MMM yyyy',
                                )}`}
                              </Box>
                              <Box pl={1.5} as="span">{`(${
                                differenceInDays(
                                  new Date(dispo.end),
                                  new Date(dispo.start),
                                ) + 1
                              } jours)`}</Box>
                            </>
                          ) : (
                            <Box>
                              <Flex alignItems="center">
                                <Text>{format(dispo.start, 'd MMM yyyy')}</Text>
                                {dispo.when && (
                                  <Text textTransform="lowercase" pl={1.5}>
                                    {`(${t(`${dispo.when}`)})`}
                                  </Text>
                                )}
                              </Flex>
                            </Box>
                          )}
                        </Box>
                      ),
                    )}
                  </Box>
                </Box>
                <Box>
                  <Divider
                    orientation="vertical"
                    mx={5}
                    h="100%"
                    opacity="0.3"
                  />
                </Box>
                <Box
                  flex={1}
                  borderBottom="1px solid"
                  pb={{ base: 4, md: 0 }}
                  mb={{ base: 4, md: 0 }}
                  borderColor={{ base: 'gray.50', md: 'transparent' }}
                >
                  <Text fontFamily="mabry medium" fontWeight="500">
                    {t('place')}
                  </Text>
                  <Text>
                    {booking?.espace?.name}
                    <Link
                      href={{
                        pathname: ROUTE_PLACE_DETAIL,
                        query: { id: booking?.espace?.slug },
                      }}
                      textDecoration="underline"
                      ml={2}
                    >{`(${t('placeDetail')})`}</Link>
                  </Text>
                </Box>
                <Box>
                  <Divider
                    orientation="vertical"
                    mx={5}
                    h="100%"
                    opacity="0.3"
                  />
                </Box>
                {user?.type === 'company' ? (
                  <Box flex={1} minW="250px" maxW="250px">
                    <Text fontFamily="mabry medium" fontWeight="500">
                      {t('structure')}
                    </Text>
                    <Text>{booking?.place?.structureName}</Text>
                  </Box>
                ) : (
                  <Box flex={1} minW="280px" maxW="280px">
                    <Text fontFamily="mabry medium" fontWeight="500">
                      {t('company')}
                    </Text>
                    <Text>{booking?.company?.structureName}</Text>
                  </Box>
                )}
              </Flex>
              <Divider opacity="0.3" />
              <Flex
                justifyContent={{ base: 'flex-end', md: 'space-between' }}
                mt={5}
                flex={1}
                direction={{ base: 'column-reverse', md: 'row' }}
              >
                <Box>
                  <BookingHistory
                    booking={booking}
                    userType={user?.type}
                    bookingType={type}
                  />
                </Box>
                {![
                  'expired',
                  'requestcanceled',
                  'requestcanceledbyplace',
                  'bookingcanceledbyplace',
                ].includes(booking?.status) && (
                  <Flex flex={0}>
                    <Divider
                      display={{ base: 'none', md: 'block' }}
                      orientation="vertical"
                      mx={5}
                      h="100%"
                      opacity="0.3"
                    />
                    <Flex
                      direction="column"
                      minW={{
                        base: 'none',
                        md: user?.type === 'company' ? '250px' : '280px',
                      }}
                      maxW={{
                        base: 'none',
                        md: user?.type === 'company' ? '250px' : '280px',
                      }}
                      w={{ base: '100%', md: 'fit-content' }}
                    >
                      <Link
                        href={`${ROUTE_ACCOUNT_MESSAGE}?conversation=${target}`}
                        as={`${ROUTE_ACCOUNT_MESSAGE}/${target}`}
                        _hover={{ textDecoration: 'none' }}
                        w="100%"
                      >
                        <Button
                          variant="message"
                          leftIcon={<Message />}
                          w="100%"
                          whiteSpace="pre"
                        >
                          <Text ml={2}>
                            {t(
                              user?.type === 'company'
                                ? `message`
                                : 'messageCompany',
                            )}
                          </Text>
                          {notifs && notifs.message > 0 && (
                            <Notif nb={notifs.message} ml={3} />
                          )}
                        </Button>
                      </Link>
                      {booking?.status === BookingStatus.PENDING &&
                        user?.type === 'place' && (
                          <ConfirmModal
                            bookingId={booking?.id}
                            setSelected={setSelected}
                          />
                        )}
                      {user?.type === 'place' && (
                        <RemoveDispoModal
                          type={type}
                          booking={booking}
                          setSelected={setSelected}
                        />
                      )}
                      {booking?.status === BookingStatus.ACCEPTED &&
                        user?.type === 'company' && (
                          <AskCancelModal
                            booking={booking}
                            setSelected={setSelected}
                          />
                        )}
                      {![
                        'requestcanceled',
                        'requestcanceledbyplace',
                        'bookingcanceledbyplace',
                        'past',
                        'occupied',
                      ].includes(status) && (
                        <CancelModal
                          type={type}
                          booking={booking}
                          setSelected={setSelected}
                        />
                      )}
                      <Divider opacity="0.3" my={5} />
                      {user?.type === 'place' ? (
                        <BookingDrawerCompany
                          company={booking?.company}
                          espace={booking?.espace}
                        />
                      ) : (
                        <BookingDrawerPlace
                          place={booking?.place}
                          espace={booking?.espace}
                        />
                      )}
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </DrawerBody>
          </Loading>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default BookingDrawer

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
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import { BookingStatus } from '~@types/booking.d'
import Loading from '~components/Loading'
import Notif from '~components/Notif'
import BookingHistory from '~components/Account/Booking/BookingHistory'
import CancelModal from '~components/Account/Booking/CancelModal'
import AskCancelModal from '~components/Account/Booking/AskCancelModal'
import ConfirmModal from '~components/Account/Booking/ConfirmModal'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useBooking } from '~hooks/useBooking'
import useIsOccupied from '~hooks/useIsOccupied'
import { client } from '~api/client-api'
import { useQueryClient } from 'react-query'
import { useMyNotifications } from '~hooks/useMyNotifications'
import BookingDrawerCompany from '~components/Account/Booking/BookingDrawerCompany'
import BookingDrawerPlace from '~components/Account/Booking/BookingDrawerPlace'

interface Props {
  bookingId: string
  setSelected: (bookingId: string) => void
  type: 'request' | 'booking'
}

const BookingDrawer = ({ bookingId, setSelected, type }: Props) => {
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
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
      <DrawerOverlay bgColor="rgb(255 255 255 / 67%)">
        <DrawerContent>
          <Loading isLoading={isLoading} isCentered>
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
                    {booking?.disponibilities.map((dispo) => (
                      <Box fontSize="sm" key={dispo.id}>
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
                              <Text>{format(dispo.end, 'd MMM yyyy')}</Text>
                              {dispo.when && (
                                <Text textTransform="lowercase" pl={1.5}>
                                  {`(${t(`${dispo.when}`)})`}
                                </Text>
                              )}
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    ))}
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
                {user.type === 'company' ? (
                  <Box flex={1}>
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
                ) : (
                  <Box flex={1}>
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
                  <BookingHistory booking={booking} type={user?.type} />
                </Box>
                {booking?.status !== 'canceled' && (
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
                      minW={{ base: 'none', md: '250px' }}
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
                              user.type === 'company'
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
                        user.type === 'place' && (
                          <ConfirmModal
                            bookingId={booking?.id}
                            setSelected={setSelected}
                          />
                        )}
                      {booking?.status === BookingStatus.ACCEPTED &&
                        user.type === 'company' && (
                          <AskCancelModal
                            booking={booking}
                            setSelected={setSelected}
                          />
                        )}
                      {![
                        'canceled',
                        'canceledbyplace',
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
                      {user.type === 'place' ? (
                        <BookingDrawerCompany company={booking?.company} />
                      ) : (
                        <BookingDrawerPlace place={booking?.place} />
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

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
import { ROUTE_PLACE_DETAIL, ROUTE_ACCOUNT_MESSAGE } from '~constants'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import { BookingStatus } from '~@types/booking.d'
import Loading from '~components/Loading'
import BookingHistory from '~components/Account/Booking/BookingHistory'
import CancelModal from '~components/Account/Booking/CancelModal'
import AskCancelModal from '~components/Account/Booking/AskCancelModal'
import ConfirmModal from '~components/Account/Booking/ConfirmModal'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useBooking } from '~hooks/useBooking'
import useIsOccupied from '~hooks/useIsOccupied'
import max from 'date-fns/max'
import isPast from 'date-fns/isPast'

interface Props {
  bookingId: string
  setSelected: (bookingId: string) => void
}

const PlaceInfo = ({ label, value }) => {
  if (!value) return null
  return (
    <Flex flexWrap="wrap">
      <Text fontFamily="mabry medium" fontWeight="500" whiteSpace="nowrap">
        {label}
      </Text>
      <Text pl={1}>{value}</Text>
    </Flex>
  )
}

const BookingDrawer = ({ bookingId, setSelected }: Props) => {
  const { data: user } = useCurrentUser()
  const { data: booking, isLoading } = useBooking(bookingId)
  const { t } = useTranslation('booking')
  const place = useMemo(
    () =>
      booking &&
      booking?.disponibilities.length > 0 &&
      booking?.disponibilities[0].espace,
    [booking],
  )

  const isOccupied = useIsOccupied(booking?.disponibilities, booking?.status)
  const status = useMemo(() => {
    if (isOccupied) return 'occupied'
    if (
      isPast(max(booking?.disponibilities.map((dispo) => new Date(dispo.end))))
    ) {
      return 'past'
    }
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
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex>
                <Text
                  pr={4}
                  fontSize="xl"
                  fontFamily="mabry medium"
                  fontWeight="500"
                >
                  {t('requestNb', { nb: booking?.id })}
                </Text>
                <Tag status={status} alignSelf="center" />
              </Flex>
            </DrawerHeader>
            <DrawerBody display="flex" flexDirection="column">
              <Flex pb={5}>
                <Box flex={1}>
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
                      {place?.name}
                      <Link
                        href={{
                          pathname: ROUTE_PLACE_DETAIL,
                          query: { id: place?.id },
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
              <Flex justifyContent="space-between" mt={5} flex={1}>
                <Box>
                  <BookingHistory booking={booking} type={user?.type} />
                </Box>
                {booking?.status !== 'canceled' && (
                  <Flex>
                    <Divider
                      orientation="vertical"
                      mr={5}
                      h="100%"
                      opacity="0.3"
                    />
                    <Flex direction="column" minW="250px">
                      {/* TODO: handle notification message */}
                      <Button
                        as={Link}
                        href={{
                          pathname: `${ROUTE_ACCOUNT_MESSAGE}?conversation=${booking?.id}`,
                        }}
                        variant="message"
                        leftIcon={<Message />}
                      >
                        <Text ml={2}>
                          {t(
                            user.type === 'company'
                              ? `message`
                              : 'messageCompany',
                          )}
                        </Text>
                      </Button>
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
                      ].includes(booking?.status) && (
                        <CancelModal
                          booking={booking}
                          setSelected={setSelected}
                        />
                      )}
                      <Divider opacity="0.3" my={5} />
                      <Box>
                        <Text fontFamily="mabry medium" fontWeight="500">
                          {user.type === 'company'
                            ? t('address')
                            : booking?.company?.structureName}
                        </Text>
                        <Text>{place?.address}</Text>
                      </Box>
                      <Box pt={5}>
                        <PlaceInfo
                          label={t('tel')}
                          value={booking?.place?.phone}
                        />
                        <PlaceInfo
                          label={t('email')}
                          value={booking?.place?.email}
                        />
                        {booking?.place?.website && (
                          <Link href={booking?.place?.website}>
                            <Text textDecoration="underline" color="gray.300">
                              {booking.place.website}
                            </Text>
                          </Link>
                        )}
                      </Box>
                      {user.type === 'place' && (
                        <Box pt={5}>
                          <PlaceInfo
                            label={t('siret')}
                            value={booking?.place?.siret}
                          />
                          <PlaceInfo
                            label={t('ape')}
                            value={booking?.place?.ape}
                          />
                          <PlaceInfo
                            label={t('insurance')}
                            value={booking?.place?.insuranceName}
                          />
                          <PlaceInfo
                            label={t('insuranceNb')}
                            value={booking?.place?.insuranceNumber}
                          />
                          <PlaceInfo
                            label={t('licence')}
                            value={booking?.place?.license}
                          />
                        </Box>
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

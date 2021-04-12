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
import { Booking } from '~typings/api'
import { useTranslation } from 'next-i18next'
import Message from 'public/assets/img/message.svg'
import Tag from '~components/Tag'
import Link from '~components/Link'
import { ROUTE_PLACE_DETAIL, ROUTE_ACCOUNT_MESSAGE_DETAIL } from '~constants'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import { DisponibilityStatus } from '~@types/disponibility'
import BookingHistory from '~components/Account/Booking/BookingHistory'
import CancelModal from '~components/Account/Booking/CancelModal'

interface Props {
  booking: Booking
  setSelected: (booking: Booking) => void
}

const BookingDrawer = ({ booking, setSelected }: Props) => {
  const { t } = useTranslation('booking')

  const place = useMemo(
    () =>
      booking &&
      booking?.disponibilities.length > 0 &&
      booking?.disponibilities[0].espace,
    [booking],
  )

  return (
    <Drawer
      isOpen={Boolean(booking)}
      placement="right"
      onClose={() => {
        setSelected(null)
      }}
      size="xl"
    >
      <DrawerOverlay bgColor="rgb(255 255 255 / 67%)">
        <DrawerContent>
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
              <Tag
                status={booking?.status as DisponibilityStatus}
                alignSelf="center"
              />
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
                <Divider orientation="vertical" mx={5} h="100%" opacity="0.3" />
              </Box>
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
            </Flex>
            <Divider opacity="0.3" />
            <Flex justifyContent="space-between" mt={5} flex={1}>
              <Box>
                <BookingHistory booking={booking} />
              </Box>
              {booking?.status !== 'canceled' && (
                <Flex>
                  <Divider
                    orientation="vertical"
                    mr={5}
                    h="100%"
                    opacity="0.3"
                  />
                  <Flex direction="column">
                    {/* TODO: handle notification message */}
                    <Button
                      as={Link}
                      href={{
                        pathname: ROUTE_ACCOUNT_MESSAGE_DETAIL,
                        query: { id: booking?.id },
                      }}
                      variant="message"
                      leftIcon={<Message />}
                    >
                      <Text ml={2}>{t(`message`)}</Text>
                    </Button>
                    {!['canceled', 'askcancel'].includes(booking?.status) && (
                      <CancelModal
                        bookingId={booking?.id}
                        setSelected={setSelected}
                      />
                    )}
                    <Divider opacity="0.3" my={5} />
                    <Box>
                      <Text fontFamily="mabry medium" fontWeight="500">
                        {t('address')}
                      </Text>
                      <Text>{place?.address}</Text>
                    </Box>
                    <Box pt={5}>
                      <Flex flexWrap="wrap">
                        <Text
                          fontFamily="mabry medium"
                          fontWeight="500"
                          whiteSpace="nowrap"
                        >
                          {t('tel')}
                        </Text>
                        <Text pl={1}>{booking?.place?.phone}</Text>
                      </Flex>
                      <Flex flexWrap="wrap">
                        <Text
                          fontFamily="mabry medium"
                          fontWeight="500"
                          whiteSpace="nowrap"
                        >
                          {t('email')}
                        </Text>
                        <Text pl={1}>{booking?.place?.email}</Text>
                      </Flex>
                      {booking?.place?.website && (
                        <Link href={booking?.place?.website}>
                          <Text textDecoration="underline" color="gray.300">
                            {booking.place.website}
                          </Text>
                        </Link>
                      )}
                    </Box>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default BookingDrawer

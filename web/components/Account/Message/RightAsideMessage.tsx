import React, { Fragment } from 'react'
import { Text, Flex, Box, VStack, Divider, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Booking } from '~typings/api'
import { UsersPermissionsUser } from '~typings/api'
import Tag from '~components/Tag'
import Link from '~components/Link'
import { format } from '~utils/date'
import { ROUTE_ACCOUNT_BOOKING, ROUTE_ACCOUNT_REQUEST } from '~constants'

interface Props {
  bookings: Booking[]
  user: UsersPermissionsUser
}

const DateBooking = ({ dispos }) => {
  const { t } = useTranslation('booking')

  if (dispos.length === 1) {
    const dispo = dispos[0]
    if (dispo.type !== 'period') {
      return <>{format(dispo.start, 'd MMMM yyyy')}</>
    }

    return (
      <>{`${format(dispo.start, 'd')} - ${format(
        dispo.start,
        'd MMM yyyy',
      )}`}</>
    )
  }

  return <>{t(`slot${dispos.length > 1 ? 's' : ''}`, { nb: dispos.length })}</>
}

const RightAsideMessage = ({ bookings, user }: Props) => {
  const { t } = useTranslation('booking')

  return (
    <Box
      borderLeft="1px solid"
      borderColor="gray.100"
      w="240px"
      px={5}
      py={6}
      display={{ base: 'none', lg: 'block' }}
    >
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="500"
        fontFamily="mabry medium"
      >
        {t(`messages.${user.type === 'place' ? 'withCompany' : 'withPlace'}`)}
      </Text>
      <VStack spacing="0" alignItems="flex-start" w="100%">
        {bookings &&
          bookings.map((booking, index) => {
            const route = ['pending', 'canceled'].includes(booking.status)
              ? ROUTE_ACCOUNT_REQUEST
              : ROUTE_ACCOUNT_BOOKING
            return (
              <Fragment key={booking.id}>
                {index >= 1 && <Divider opacity="0.5" />}
                <Box pl={3} py={4} w="100%">
                  <Flex>
                    <Text fontWeight="500" mr={1} fontFamily="mabry medium">
                      {booking.id},
                    </Text>
                    <DateBooking dispos={booking.disponibilities} />
                  </Flex>
                  <Flex alignItems="center">
                    <Tag status={booking.status} />
                    <Link
                      ml={2}
                      whiteSpace="pre"
                      alignSelf="flex-start"
                      href={`${route}?id=${booking?.id}`}
                      as={`${route}/${booking?.id}`}
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <Button
                        px={2}
                        h="25px"
                        ml={0}
                        variant="outline"
                        color="grayText.1"
                        colorScheme="gray"
                        size="sm"
                        borderRadius="sm"
                        fontSize="md"
                      >
                        {t('detail')}
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Fragment>
            )
          })}
      </VStack>
    </Box>
  )
}

export default RightAsideMessage

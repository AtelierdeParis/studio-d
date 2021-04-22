import React, { useMemo } from 'react'
import { Text, Flex, Box, Circle } from '@chakra-ui/react'
import Link from '~components/Link'
import Squares from 'public/assets/img/squares.svg'
import { useMyNotifications } from '~hooks/useMyNotifications'
import { useMyBookings } from '~hooks/useMyBookings'
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_PLACES,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'

const AuthenticatedMenu = ({ user, colorMode }) => {
  const { data: notifs } = useMyNotifications()
  const { data: bookings } = useMyBookings('all')

  const routeToRedirect = useMemo(() => {
    if (!user) return null
    if (user.type === 'place' && user.espaces.length > 0)
      return ROUTE_ACCOUNT_PLACES
    if (user.type === 'company' && bookings && bookings.length > 0)
      return ROUTE_ACCOUNT_REQUEST
    return ROUTE_ACCOUNT
  }, [user])

  return (
    <Flex
      as={Link}
      href={routeToRedirect}
      alignItems="center"
      role="group"
      _hover={{ textDecoration: 'none' }}
    >
      <Squares stroke={colorMode} />
      <Box maxW="15rem" pos="relative">
        <Text
          ml={3}
          pt="2px"
          fontWeight="500"
          lineHeight={1.2}
          isTruncated
          borderBottom="1px solid"
          borderColor="transparent"
          _groupHover={{
            textDecoration: 'none',
            borderColor: 'orange.500',
          }}
        >
          {user.structureName}
        </Text>
        <Circle
          pos="absolute"
          bgColor="orange.500"
          size="8px"
          right="-8px"
          top="0"
        />
      </Box>
    </Flex>
  )
}

export default AuthenticatedMenu

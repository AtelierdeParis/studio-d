import React, { useMemo } from 'react'
import { Text, Flex, Box, Circle } from '@chakra-ui/react'
import Link from '~components/Link'
import Squares from 'public/assets/img/squares.svg'
import { useMyNotifications } from '~hooks/useMyNotifications'
import { useMyBookings } from '~hooks/useMyBookings'
import { getRouteToRedirect } from '~utils/auth'

const AuthenticatedMenu = ({ user, colorMode, isMobileMenu = false }) => {
  const { data: notifs } = useMyNotifications()
  const { data: bookings } = useMyBookings('all')

  const routeToRedirect = useMemo(() => getRouteToRedirect(user, bookings), [
    user,
  ])

  return (
    <Flex
      as={Link}
      href={routeToRedirect}
      alignItems="center"
      role="group"
      _hover={{ textDecoration: 'none' }}
      w="100%"
      justifyContent="center"
    >
      <Squares stroke={colorMode} />
      <Box maxW={{ base: '100%', md: '15rem' }} pos="relative">
        <Text
          ml={3}
          pt="2px"
          fontWeight="500"
          lineHeight={1.2}
          isTruncated
          maxW={{ base: isMobileMenu ? 'none' : '110px', sm: 'none' }}
          borderBottom="1px solid"
          borderColor="transparent"
          _groupHover={{
            textDecoration: 'none',
            borderColor: 'orange.500',
          }}
        >
          {user.structureName}
        </Text>
        {notifs && Object.values(notifs).reduce((a, b) => a + b, 0) > 0 && (
          <Circle
            pos="absolute"
            bgColor="orange.500"
            size="8px"
            right="-8px"
            top="0"
          />
        )}
      </Box>
    </Flex>
  )
}

export default AuthenticatedMenu

import React, { useMemo } from 'react'
import { ButtonGroup, Button, Text, Flex, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import SigninModal from '~components/Signin/SigninModal'
import {
  ROUTE_SIGNUP,
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_PLACES,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'
import Squares from 'public/assets/img/squares.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useMyBookings } from '~hooks/useMyBookings'
interface IAuthMenu {
  colorMode: 'white' | 'black'
}
const AuthMenu = ({ colorMode }: IAuthMenu) => {
  const { t } = useTranslation('common')
  const { data: user } = useCurrentUser()
  const { data: bookings } = useMyBookings('all', { enabled: Boolean(user) })

  const routeToRedirect = useMemo(() => {
    if (!user) return null
    if (user.type === 'place' && user.espaces.length > 0)
      return ROUTE_ACCOUNT_PLACES
    if (user.type === 'company' && bookings.length > 0)
      return ROUTE_ACCOUNT_REQUEST
    return ROUTE_ACCOUNT
  }, [user])

  if (user) {
    return (
      <Flex
        as={Link}
        href={routeToRedirect}
        alignItems="center"
        role="group"
        _hover={{ textDecoration: 'none' }}
      >
        <Squares stroke={colorMode} />
        <Box maxW="15rem">
          <Text
            ml={3}
            pt="2px"
            fontWeight="500"
            lineHeight={1.2}
            isTruncated
            borderBottom="1px solid transparent"
            _groupHover={{
              textDecoration: 'none',
              borderBottom: `1px solid ${colorMode}`,
            }}
          >
            {user.structureName}
          </Text>
        </Box>
      </Flex>
    )
  }

  return (
    <ButtonGroup spacing={5}>
      <Button variant="unstyled" fontSize="md">
        <Link href={ROUTE_SIGNUP}>{t('nav.signup')}</Link>
      </Button>
      <SigninModal>
        <Button>{t('nav.signin')}</Button>
      </SigninModal>
    </ButtonGroup>
  )
}

export default AuthMenu

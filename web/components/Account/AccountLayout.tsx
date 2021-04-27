import React, { useMemo } from 'react'
import { Container, Flex, useBreakpointValue } from '@chakra-ui/react'
import AccountMenu from '~components/Account/AccountMenu'
import AccountMobileMenu from '~components/Account/AccountMobileMenu'
import Loading from '~components/Loading'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useRouter } from 'next/router'

const AccountLayout = (props) => {
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { data: user, isLoading } = useCurrentUser()
  const isMessage = useMemo(
    () => router.pathname.startsWith(ROUTE_ACCOUNT_MESSAGE),
    [router.pathname],
  )

  return (
    <Flex direction={{ base: 'column', md: 'row' }} h="100vh">
      {isMobile ? (
        <AccountMobileMenu user={user} />
      ) : (
        <AccountMenu user={user} />
      )}

      <Container
        position="relative"
        h="100vh"
        overflow="auto"
        px={isMessage ? 0 : 3}
        maxW="none"
      >
        <Loading isLoading={isLoading} isCentered>
          {React.cloneElement(props.children, { user })}
        </Loading>
      </Container>
    </Flex>
  )
}

export default AccountLayout

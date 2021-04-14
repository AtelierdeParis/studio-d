import React, { useMemo } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import AccountMenu from '~components/Account/AccountMenu'
import Loading from '~components/Loading'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useRouter } from 'next/router'

const AccountLayout = (props) => {
  const router = useRouter()
  const { data: user, isLoading } = useCurrentUser()
  const isMessage = useMemo(
    () => router.pathname.startsWith(ROUTE_ACCOUNT_MESSAGE),
    [router.pathname],
  )

  return (
    <Flex>
      <AccountMenu user={user} />
      <Container
        position="relative"
        h="100vh"
        overflow="auto"
        p={isMessage && 0}
      >
        <Loading isLoading={isLoading} isCentered>
          {React.cloneElement(props.children, { user })}
        </Loading>
      </Container>
    </Flex>
  )
}

export default AccountLayout

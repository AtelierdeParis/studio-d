import React, { useMemo, useEffect } from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import AccountLayout from 'components/Account/AccountLayout'
import Header from '~components/Navigation/Header'
import Footer from 'components/Footer'
import { useRouter } from 'next/router'
import { ROUTE_PLACE_DETAIL } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useUserIsComplete } from '~hooks/useUserIsComplete'
import { ROUTE_ACCOUNT_INFORMATION } from '~constants'

interface props {
  children: React.ReactNode
}

const Layout = (props: props) => {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const isComplete = useUserIsComplete(user)

  useEffect(() => {
    if (!isComplete) {
      router.push(ROUTE_ACCOUNT_INFORMATION)
    }
  }, [user, isComplete, router.pathname])

  const isRouteWithoutContainer = useMemo(
    () => ['/', ROUTE_PLACE_DETAIL].includes(router.pathname),
    [router.pathname],
  )

  if (router.pathname.startsWith('/compte')) {
    return <AccountLayout>{props.children}</AccountLayout>
  }

  return (
    <Flex
      minH="100vh"
      direction="column"
      justifyContent="space-between"
      fontSize={{ base: 'sm', sm: 'md' }}
    >
      <Box>
        <Header colorMode={router.pathname === '/' ? 'white' : 'black'} />
        {isRouteWithoutContainer ? (
          props.children
        ) : (
          <Container>{props.children}</Container>
        )}
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout

import React, { useMemo } from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import AccountLayout from 'components/Account/AccountLayout'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { useRouter } from 'next/router'
import { ROUTE_PLACE_DETAIL } from '~constants'

interface ILayout {
  children: React.ReactNode
}

const Layout = (props: ILayout) => {
  const router = useRouter()
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

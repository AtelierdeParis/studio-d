import React, { useMemo } from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import AccountLayout from 'components/Account/AccountLayout'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { useRouter } from 'next/router'

interface ILayout {
  children: React.ReactNode
}

const Layout = (props: ILayout) => {
  const router = useRouter()
  const isHome = useMemo(() => router.pathname === '/', [router.pathname])

  if (router.pathname.startsWith('/account')) {
    return <AccountLayout>{props.children}</AccountLayout>
  }

  return (
    <Flex minH="100vh" direction="column" justifyContent="space-between">
      <Box>
        <Header colorMode={isHome ? 'white' : 'black'} />
        {isHome ? props.children : <Container>{props.children}</Container>}
      </Box>
      <Footer />
    </Flex>
  )
}

export default Layout

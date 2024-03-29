import React, { useMemo } from 'react'
import { Box, Container, Flex, useBreakpointValue } from '@chakra-ui/react'
import AccountMenu from '~components/Account/AccountMenu'
import AccountMobileMenu from '~components/Account/AccountMobileMenu'
import Loading from '~components/Loading'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useRouter } from 'next/router'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const AccountLayout = (props) => {
  const router = useRouter()
  const { isLoading: isCampaignLoading } = useCampaignContext()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { data: user, isLoading } = useCurrentUser()
  const isMessage = useMemo(
    () => router.pathname.startsWith(ROUTE_ACCOUNT_MESSAGE),
    [router.pathname],
  )

  return (
    <Flex direction={{ base: 'column', md: 'row' }} h="100vh">
      <Loading
        isLoading={isLoading || isCampaignLoading}
        skeleton={<Box></Box>}
      >
        {isMobile ? (
          <AccountMobileMenu user={user} />
        ) : (
          <AccountMenu user={user} />
        )}
      </Loading>

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

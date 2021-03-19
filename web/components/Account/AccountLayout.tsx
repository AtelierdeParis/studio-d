import React from 'react'
import { Container, Flex } from '@chakra-ui/react'
import AccountMenu from '~components/Account/AccountMenu'
import Loading from '~components/Loading'
import { useCurrentUser } from '~hooks/useCurrentUser'

const AccountLayout = (props) => {
  const { data: user, isLoading } = useCurrentUser()

  return (
    <Flex>
      <AccountMenu user={user} />
      <Container position="relative">
        <Loading isLoading={isLoading} isCentered>
          {React.cloneElement(props.children, { user })}
        </Loading>
      </Container>
    </Flex>
  )
}

export default AccountLayout

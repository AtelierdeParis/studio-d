import React from 'react'
import { ButtonGroup, Button, Text, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import SigninModal from '~components/Signin/SigninModal'
import { ROUTE_SIGNUP, ROUTE_ACCOUNT } from '~constants'
import { useSession } from 'next-auth/client'
import Squares from 'public/assets/img/squares.svg'
interface IAuthMenu {
  colorMode: 'white' | 'black'
}
const AuthMenu = ({ colorMode }: IAuthMenu) => {
  const { t } = useTranslation('common')
  const [session] = useSession()

  if (session) {
    return (
      <Flex as={Link} href={ROUTE_ACCOUNT} alignItems="center">
        <Squares stroke={colorMode} />
        <Text pl={3} fontWeight="500" lineHeight={1}>
          {session.user.name}
        </Text>
      </Flex>
    )
  }

  return (
    <ButtonGroup spacing={5}>
      <Button variant="unstyled" fontSize="md">
        <Link href={ROUTE_SIGNUP}>{t('nav.signup')}</Link>
      </Button>
      <SigninModal />
    </ButtonGroup>
  )
}

export default AuthMenu

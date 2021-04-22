import React from 'react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import AuthenticatedMenu from '~components/AuthenticatedMenu'
import SigninModal from '~components/Signin/SigninModal'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { ROUTE_SIGNUP } from '~constants'

interface IAuthMenu {
  colorMode: 'white' | 'black'
}
const AuthMenu = ({ colorMode }: IAuthMenu) => {
  const { t } = useTranslation('common')
  const { data: user } = useCurrentUser()

  if (user) {
    return <AuthenticatedMenu user={user} colorMode={colorMode} />
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

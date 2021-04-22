import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
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
    <HStack spacing={5} alignItems="center">
      <Link
        href={ROUTE_SIGNUP}
        lineHeight="1.2"
        borderBottom="1px solid"
        borderColor="transparent"
        fontSize="md"
        _hover={{
          borderColor: 'orange.500',
        }}
      >
        {t('nav.signup')}
      </Link>

      <SigninModal>
        <Button>{t('nav.signin')}</Button>
      </SigninModal>
    </HStack>
  )
}

export default AuthMenu

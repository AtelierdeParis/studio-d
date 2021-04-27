import React from 'react'
import { HStack, Button, Box, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import AuthenticatedMenu from '~components/AuthenticatedMenu'
import SigninModal from '~components/Signin/SigninModal'
import { ROUTE_SIGNUP } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import MobileMenu from '~components/MobileMenu'

interface Props {
  colorMode: 'white' | 'black'
}

const AuthMenu = ({ colorMode }: Props) => {
  const { t } = useTranslation('common')
  const { data: user } = useCurrentUser()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <HStack spacing={5} alignItems="center">
      {user ? (
        <AuthenticatedMenu user={user} colorMode={colorMode} />
      ) : (
        <>
          <Link
            href={ROUTE_SIGNUP}
            lineHeight="1.2"
            borderBottom="1px solid"
            borderColor="transparent"
            fontSize="md"
            display={{
              base: 'none',
              lg: 'block',
            }}
            _hover={{
              borderColor: 'orange.500',
            }}
          >
            {t('nav.signup')}
          </Link>
          <SigninModal>
            <Button size="md">{t('nav.signin')}</Button>
          </SigninModal>
        </>
      )}
      {isMobile && <MobileMenu colorMode={colorMode} />}
    </HStack>
  )
}

export default AuthMenu

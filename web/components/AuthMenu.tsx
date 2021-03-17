import React from 'react'
import { ButtonGroup, Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'

const AuthMenu = () => {
  const { t } = useTranslation('common')
  return (
    <ButtonGroup spacing={5}>
      <Button variant="unstyled" fontSize="md">
        <Link href={ROUTE_SIGNUP}>{t('nav.signup')}</Link>
      </Button>
      <Button>{t('nav.signin')}</Button>
    </ButtonGroup>
  )
}

export default AuthMenu

import React from 'react'
import { Button, Text, Box, ButtonGroup } from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'
import SigninModal from '~components/Signin/SigninModal'
import { useTranslation } from 'next-i18next'

const AuthInsert = ({ nbSelected }: { nbSelected: number }) => {
  const { t } = useTranslation('place')

  return (
    <>
      <Box maxW="container.sm" pr={6}>
        <Text>
          {t(`detail.notAuth${nbSelected > 1 ? 's' : ''}`, { nb: nbSelected })}
        </Text>
      </Box>
      <ButtonGroup
        spacing={5}
        alignSelf="center"
        alignItems="center"
        mt={{ base: 6, md: 0 }}
      >
        <Button variant="unstyled" fontSize="md">
          <Link href={ROUTE_SIGNUP}>{t('common:nav.signup')}</Link>
        </Button>
        <SigninModal redirect={false}>
          <Button size="lg">{t('common:nav.signin')}</Button>
        </SigninModal>
      </ButtonGroup>
    </>
  )
}

export default AuthInsert

import React from 'react'
import Link from '~components/Link'
import {
  ROUTE_PLACES,
  ROUTE_PROJECT,
  ROUTE_CONTACT,
  ROUTE_ACTU,
  ROUTE_FAQ,
  ROUTE_SIGNUP,
  ROUTE_CGU,
  ROUTE_USE_POLICY,
} from '~constants'
import { Box, Flex, Text, Link as ChakraLink, Divider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import SigninModal from '~components/Signin/SigninModal'
import { useSession } from 'next-auth/client'

const MenuItem = ({ href, text }) => {
  return (
    <Link href={href} borderBottom="1px solid">
      <Text>{text}</Text>
    </Link>
  )
}

const FooterMenu = () => {
  const [session, loading] = useSession()
  const { t } = useTranslation()
  return (
    <Box>
      <Flex pr={12}>
        <Box>
          <MenuItem href="/" text={t('nav.home')} />
          <MenuItem href={ROUTE_PROJECT} text={t('nav.project')} />
          <MenuItem href={ROUTE_PLACES} text={t('nav.places')} />
          <MenuItem href={ROUTE_ACTU} text={t('nav.news')} />
          <MenuItem href={ROUTE_FAQ} text={t('nav.faq')} />
          <MenuItem href={ROUTE_CONTACT} text={t('nav.contact')} />
        </Box>
        {!loading && !session && (
          <Box pl={14}>
            <MenuItem href={ROUTE_SIGNUP} text={t('nav.signup')} />
            <SigninModal>
              <ChakraLink textShadow="none">{t('nav.signin')}</ChakraLink>
            </SigninModal>
          </Box>
        )}
      </Flex>
      <Divider
        my={{ base: 2, lg: 5 }}
        opacity={{ base: 0, lg: 1 }}
        borderColor="gray.100"
      />
      <Box>
        <MenuItem href={ROUTE_CGU} text={t('nav.cgu')} />
        <MenuItem href={ROUTE_USE_POLICY} text={t('nav.policy')} />
      </Box>
    </Box>
  )
}

export default FooterMenu

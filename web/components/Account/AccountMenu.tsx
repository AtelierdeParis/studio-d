import React from 'react'
import { Box, Image, Flex, Link, Text } from '@chakra-ui/react'
import {
  ROUTE_ACCOUNT,
  ROUTE_USE_POLICY,
  ROUTE_ACCOUNT_INFORMATION,
} from '~constants'
import NextLink from '~components/Link'
import Back from 'public/assets/img/back.svg'
import User from 'public/assets/img/user.svg'
import Charte from 'public/assets/img/charte.svg'
import Logout from 'public/assets/img/logout.svg'
import { useTranslation } from 'next-i18next'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

const myAccount = {
  title: 'myAccount',
  items: [
    {
      icon: <User />,
      label: 'info',
      url: ROUTE_ACCOUNT_INFORMATION,
    },
    {
      icon: <Logout />,
      label: 'logout',
      onClick: () => signOut({ callbackUrl: '/' }),
    },
  ],
}

const styleActive = {
  backgroundColor: 'blue.200',
  color: 'blue.500',
}

const AccountMenu = () => {
  const { t } = useTranslation('account')
  const router = useRouter()

  const displayMenu = ({ title, items }) => {
    return (
      <Box>
        <Text
          px={5}
          textTransform="uppercase"
          fontSize="xs"
          color="black"
          pb={4}
        >
          {t(title)}
        </Text>
        {items.map(({ icon, label, url = null, onClick = null }) => (
          <Link href={url} _hover={{ textDecoration: 'none' }} key={label}>
            <Flex
              alignItems="center"
              _hover={styleActive}
              cursor="pointer"
              px={5}
              py={2.5}
              w="100%"
              onClick={onClick}
              {...(router.pathname === url ? styleActive : {})}
            >
              {icon}
              <Text pl={4} lineHeight={1}>
                {t(label)}
              </Text>
            </Flex>
          </Link>
        ))}
      </Box>
    )
  }
  return (
    <Flex direction="column" color="grayText.1" w="20rem" h="100vh">
      <Box backgroundColor="blue.100" flexGrow={1}>
        <Flex pb={14} px={5} pt={4}>
          <NextLink href="/">
            <Back />
          </NextLink>
          <Link href={ROUTE_ACCOUNT}>
            <Image ml={3} src="/assets/img/logo-studio-d.png" w="100px" />
          </Link>
        </Flex>
        {displayMenu(myAccount)}
      </Box>
      <Flex backgroundColor="blue.200" p={5}>
        {/* TODO: create this page */}
        <NextLink href={ROUTE_USE_POLICY} display="flex" alignItems="center">
          <Charte />
          <Text pl={3}>{t('charte')}</Text>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default AccountMenu

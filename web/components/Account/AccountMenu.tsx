import React from 'react'
import { Box, Image, Flex, Text, VStack } from '@chakra-ui/react'
import {
  ROUTE_ACCOUNT,
  ROUTE_USE_POLICY,
  ROUTE_ACCOUNT_INFORMATION,
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_MESSAGE,
  ROUTE_ACCOUNT_PLACES,
} from '~constants'
import Link from '~components/Link'
import Back from 'public/assets/img/back.svg'
import Profile from 'public/assets/img/user.svg'
import Charte from 'public/assets/img/charte.svg'
import Logout from 'public/assets/img/logout.svg'
import Home from 'public/assets/img/home.svg'
import Calendar from 'public/assets/img/calendar.svg'
import Message from 'public/assets/img/message.svg'
import Question from 'public/assets/img/question.svg'
import { useTranslation } from 'next-i18next'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { User } from '~@types/user'

const accountItems = {
  title: 'myAccount',
  items: [
    {
      icon: <Profile />,
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

const placeItems = {
  title: 'dashboard',
  items: [
    {
      icon: <Home />,
      label: 'place.home',
      url: ROUTE_ACCOUNT_PLACES,
    },
    {
      icon: <Question />,
      label: 'place.question',
      url: ROUTE_ACCOUNT_REQUEST,
    },
    {
      icon: <Calendar />,
      label: 'place.calendar',
      url: ROUTE_ACCOUNT_BOOKING,
    },
    {
      icon: <Message />,
      label: 'place.message',
      url: ROUTE_ACCOUNT_MESSAGE,
    },
  ],
}

const companyItems = {
  title: 'dashboard',
  items: [
    {
      icon: <Question />,
      label: 'company.question',
      url: ROUTE_ACCOUNT_REQUEST,
    },
    {
      icon: <Calendar />,
      label: 'company.calendar',
      url: ROUTE_ACCOUNT_BOOKING,
    },
    {
      icon: <Message />,
      label: 'company.message',
      url: ROUTE_ACCOUNT_MESSAGE,
    },
  ],
}

const styleActive = {
  backgroundColor: 'blue.200',
  color: 'blue.500',
}

const AccountMenu = ({ user }: { user: User }) => {
  const { t } = useTranslation('account')
  const router = useRouter()

  const displayMenu = ({ title, items }) => {
    return (
      <Box w="100%">
        <Text
          px={5}
          textTransform="uppercase"
          fontSize="xs"
          color="black"
          pb={4}
        >
          {t(title)}
        </Text>
        {items.map(({ icon, label, url = '#', onClick = null }) => (
          <Link
            href={url}
            _hover={{ textDecoration: 'none' }}
            key={label}
            display="block"
          >
            <Flex
              alignItems="center"
              _hover={styleActive}
              cursor="pointer"
              px={5}
              py={2.5}
              w="100%"
              onClick={onClick}
              {...(router.pathname.startsWith(url) ? styleActive : {})}
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
          <Link href="/">
            <Back />
          </Link>
          <Link href={ROUTE_ACCOUNT}>
            <Image ml={3} src="/assets/img/logo-studio-d.png" w="100px" />
          </Link>
        </Flex>
        <VStack spacing={12}>
          {/* TODO: handle good user type */}
          {user?.confirmed &&
            displayMenu(user.type === 'company' ? companyItems : placeItems)}
          {displayMenu(accountItems)}
        </VStack>
      </Box>
      <Flex backgroundColor="blue.200" p={5}>
        {/* TODO: create this page */}
        <Link href={ROUTE_USE_POLICY} display="flex" alignItems="center">
          <Charte />
          <Text pl={3}>{t('charte')}</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default AccountMenu

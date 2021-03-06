import React from 'react'
import { Box, Image, Flex, Text, VStack, BoxProps } from '@chakra-ui/react'
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
import Notif from '~components/Notif'
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
import { UsersPermissionsUser } from '~typings/api'
import { useMyNotifications } from '~hooks/useMyNotifications'
import { useUserIsComplete } from '~hooks/useUserIsComplete'

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
      icon: <Calendar stroke="#283583" />,
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
      icon: <Calendar stroke="#283583" />,
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

const styleActive: BoxProps = {
  backgroundColor: 'blue.200',
  color: 'blue.500',
}

const styleNotif: BoxProps = {
  ml: 2,
}

const AccountMenu = ({ user }: { user: UsersPermissionsUser }) => {
  const { t } = useTranslation('account')
  const router = useRouter()
  const isComplete = useUserIsComplete(user)
  const { data: notifs } = useMyNotifications()

  const displayMenu = ({ title, items }) => {
    const isDisactivated = !isComplete && title === 'dashboard'
    return (
      <Box w="100%" opacity={isDisactivated ? 0.5 : 1}>
        <Text
          px={5}
          textTransform="uppercase"
          fontSize="xs"
          color="black"
          pb={4}
          fontWeight="500"
          fontFamily="mabry medium"
        >
          {t(title)}
        </Text>
        {items.map(({ icon, label, url = '#', onClick = null }) => (
          <Link
            href={isDisactivated ? '' : url}
            _hover={{ textDecoration: 'none' }}
            key={label}
            display="block"
          >
            <Flex
              position="relative"
              alignItems="center"
              _hover={{
                color: isDisactivated ? 'auto' : 'blue.500',
              }}
              cursor={isDisactivated ? 'not-allowed' : 'pointer'}
              px={5}
              py={2.5}
              w="100%"
              onClick={onClick}
              {...(router.pathname.startsWith(url) ? styleActive : {})}
            >
              {icon}
              <Box pl={4} lineHeight={1}>
                {t(label)}
              </Box>
              {!router.pathname.startsWith(url) && (
                <>
                  {url === ROUTE_ACCOUNT_MESSAGE && notifs?.message > 0 && (
                    <Notif nb={notifs?.message} {...styleNotif} />
                  )}
                  {url === ROUTE_ACCOUNT_REQUEST && notifs?.request > 0 && (
                    <Notif nb={notifs?.request} {...styleNotif} />
                  )}
                  {url === ROUTE_ACCOUNT_BOOKING && notifs?.booking > 0 && (
                    <Notif nb={notifs?.booking} {...styleNotif} />
                  )}
                </>
              )}
            </Flex>
          </Link>
        ))}
      </Box>
    )
  }
  return (
    <Flex
      direction="column"
      color="grayText.1"
      minW={{ base: '100%', md: '15rem' }}
      maxW={{ base: '100%', md: '15rem' }}
      h={{ base: 'fit-content', md: '100vh' }}
      pos="relative"
      zIndex={999}
    >
      <Box backgroundColor="blue.100" flexGrow={1}>
        <Flex pb={14} px={5} pt={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="/">
            <Back />
          </Link>
          <Link
            href={
              user?.type === 'company'
                ? ROUTE_ACCOUNT_REQUEST
                : ROUTE_ACCOUNT_PLACES
            }
          >
            <Image ml={3} src="/assets/img/logo-studio-d.svg" w="100px" />
          </Link>
        </Flex>
        <VStack spacing={12}>
          {user?.confirmed &&
            user?.accepted &&
            displayMenu(user.type === 'company' ? companyItems : placeItems)}
          {displayMenu(accountItems)}
        </VStack>
      </Box>
      <Flex
        backgroundColor="blue.200"
        p={5}
        display={{ base: 'none', md: 'flex' }}
      >
        <Link href={ROUTE_USE_POLICY} display="flex" alignItems="center">
          <Charte />
          <Text pl={3}>{t('charte')}</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default AccountMenu

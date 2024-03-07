import React, { useMemo } from 'react'
import { Box, Image, Flex, Text, VStack, BoxProps } from '@chakra-ui/react'
import {
  ROUTE_USE_POLICY,
  ROUTE_ACCOUNT_INFORMATION,
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_MESSAGE,
  ROUTE_ACCOUNT_PLACES,
  ROUTE_ACCOUNT_APPLICATIONS,
  ROUTE_ACCOUNT_MY_APPLICATIONS,
} from '~constants'
import Link from '~components/Link'
import Back from 'public/assets/img/back.svg'
import Notif from '~components/Notif'
import Profile from 'public/assets/img/user.svg'
import Applications from 'public/assets/img/applicationsSmall.svg'
import ApplicationsLoading from 'public/assets/img/applicationsSmallLoading.svg'
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
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useMyApplications } from '~hooks/useMyApplications'

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

const getApplicationsItems = ({
  isNext,
  isPlace,
  translationParams,
}: {
  isNext: boolean
  translationParams: { title: string }
  isPlace: boolean
}) => ({
  title: 'applications.menu_title',
  translationParams,
  items: [
    {
      icon: isNext ? <ApplicationsLoading /> : <Applications />,
      label: isNext
        ? 'next'
        : isPlace
        ? 'placeApplications'
        : 'companyApplications',
      url: isPlace ? ROUTE_ACCOUNT_APPLICATIONS : ROUTE_ACCOUNT_MY_APPLICATIONS,
    },
  ],
})

const getPlaceItems = (hasCampaigns) => ({
  title: hasCampaigns ? 'solidarity' : 'dashboard',
  items: [
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
})

const getCompanyItems = (isCampaignMode: boolean) => ({
  title: isCampaignMode ? 'solidarity' : 'dashboard',
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
})

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

  const { currentCampaign, placeCampaigns } = useCampaignContext()
  const applicationItems = useMemo(
    () =>
      getApplicationsItems({
        isNext:
          user?.type === 'company' &&
          currentCampaign?.mode === 'disponibilities',
        translationParams: { title: currentCampaign?.title },
        isPlace: user?.type === 'place',
      }),
    [currentCampaign, user?.type],
  )

  const { data: applications } = useMyApplications({})

  const placeItems = useMemo(() => getPlaceItems(placeCampaigns?.length), [
    placeCampaigns?.length,
  ])

  const companyItems = useMemo(
    () => getCompanyItems(Boolean(currentCampaign)),
    [currentCampaign],
  )
  const displayApplications =
    (user?.type === 'place' &&
      placeCampaigns?.length &&
      applications?.length) ||
    (user?.type === 'company' && currentCampaign)

  const displayMenu = ({ title, items, translationParams = {} }) => {
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
          {t(title, translationParams)}
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
            user?.type === 'place' &&
            displayMenu({
              title: '',
              items: [
                {
                  icon: <Home />,
                  label: 'place.home',
                  url: ROUTE_ACCOUNT_PLACES,
                },
              ],
            })}
          {user?.confirmed &&
            user?.accepted &&
            displayMenu(user?.type === 'company' ? companyItems : placeItems)}
          {displayApplications && displayMenu(applicationItems)}
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

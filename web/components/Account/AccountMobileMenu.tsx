import React, { useEffect } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
  Flex,
  Text,
  CloseButton as OpenButton,
} from '@chakra-ui/react'
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_INFORMATION,
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_MESSAGE,
  ROUTE_ACCOUNT_PLACES,
} from '~constants'
import Link from '~components/Link'
import Back from 'public/assets/img/back.svg'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import AccountMenu from '~components/Account/AccountMenu'
import { UsersPermissionsUser } from '~typings/api'
import Chevron from 'public/assets/img/chevron-up.svg'

const routeLabel = {
  [ROUTE_ACCOUNT_INFORMATION]: 'info',
  [ROUTE_ACCOUNT_PLACES]: 'place.home',
  [ROUTE_ACCOUNT_REQUEST]: 'place.question',
  [ROUTE_ACCOUNT_BOOKING]: 'place.calendar',
  [ROUTE_ACCOUNT_MESSAGE]: 'place.message',
  [ROUTE_ACCOUNT_REQUEST]: 'company.question',
  [ROUTE_ACCOUNT_BOOKING]: 'company.calendar',
  [ROUTE_ACCOUNT_MESSAGE]: 'company.message',
}

const AccountMobileMenu = ({ user }: { user: UsersPermissionsUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('account')
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [router.pathname])

  return (
    <>
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        py={3.5}
        px={3}
        bgColor="blue.100"
      >
        <Flex alignItems="center">
          <Link href="/">
            <Back />
          </Link>
          <Link href={ROUTE_ACCOUNT}>
            <Image
              ml={3}
              src="/assets/img/logo-studio-d.svg"
              h={{
                base: '16px',
                sm: 'auto',
              }}
            />
          </Link>
        </Flex>
        <Flex alignItems="center" cursor="pointer" onClick={onOpen}>
          {routeLabel[router.pathname] && (
            <Text mr={2} color="grayText.1" _hover={{ color: 'blue.500' }}>
              {t(routeLabel[router.pathname])}
            </Text>
          )}
          <OpenButton
            _focus={{
              outline: 'none',
            }}
          >
            <Chevron />
          </OpenButton>
        </Flex>
      </Flex>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              p={0}
              borderBottomWidth="1px"
              borderColor="rgba(0, 0, 0, 0.1)"
            >
              <Flex
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                py={3.5}
                px={3}
                bgColor="blue.100"
              >
                <Flex alignItems="center">
                  <Link href="/">
                    <Back />
                  </Link>
                  <Link href={ROUTE_ACCOUNT}>
                    <Image
                      ml={3}
                      src="/assets/img/logo-studio-d.svg"
                      h={{
                        base: '16px',
                        sm: 'auto',
                      }}
                    />
                  </Link>
                </Flex>
              </Flex>
              <DrawerCloseButton
                _focus={{
                  outline: 'none',
                }}
                transform="rotate(180deg)"
              >
                <Chevron />
              </DrawerCloseButton>
            </DrawerHeader>
            <DrawerBody
              justifyContent="center"
              display="flex"
              flexDirection="column"
              pt={7}
              pb={7}
              px={0}
              bgColor="blue.100"
            >
              <AccountMenu user={user} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default AccountMobileMenu

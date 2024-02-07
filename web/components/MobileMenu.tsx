import React, { useEffect } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  Box,
  Image,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import {
  ROUTE_PLACES,
  ROUTE_PROJECT,
  ROUTE_CONTACT,
  ROUTE_ACTU,
  ROUTE_FAQ,
  ROUTE_SIGNUP,
} from '~constants'
import Burger from 'public/assets/img/burger.svg'
import SigninModal from '~components/Signin/SigninModal'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { useRouter } from 'next/router'
import { useCurrentUser } from '~hooks/useCurrentUser'
import Squares from 'public/assets/img/squares.svg'
import AuthenticatedMenu from '~components/AuthenticatedMenu'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const MenuItem = ({ href, text }) => {
  const router = useRouter()
  return (
    <Link
      my={1}
      fontSize={{ base: 'sm', md: 'md' }}
      alignSelf="center"
      href={href}
      lineHeight="1.2"
      borderBottom="1px solid"
      borderBottomColor={
        router.pathname === href || router?.asPath === href
          ? 'orange.500'
          : 'transparent'
      }
      _hover={{
        borderColor: 'orange.500',
      }}
    >
      <Text>{text}</Text>
    </Link>
  )
}

interface Props {
  colorMode: 'white' | 'black'
}

const MobileMenu = ({ colorMode }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('common')
  const { data: user } = useCurrentUser()
  const router = useRouter()
  const { currentCampaign } = useCampaignContext()

  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [router.pathname])

  return (
    <>
      <Box cursor="pointer" onClick={onOpen}>
        <Burger stroke={colorMode} />
      </Box>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              px={3}
              borderBottomWidth="1px"
              borderColor="rgba(0, 0, 0, 0.1)"
            >
              <Image
                src={`/assets/img/logo-studio-d.svg`}
                alt="Logo Studio D"
                h={{
                  base: '16px',
                  sm: 'auto',
                }}
              />
              <DrawerCloseButton
                _focus={{
                  outline: 'none',
                }}
              />
            </DrawerHeader>
            <DrawerBody
              justifyContent="center"
              display="flex"
              flexDirection="column"
              py={6}
            >
              {currentCampaign?.mode === 'applications' ? (
                <>
                  <MenuItem
                    href={`${ROUTE_PLACES}?tab=0`}
                    text={t('nav.places_regular')}
                  />
                  <MenuItem
                    href={`${ROUTE_PLACES}?tab=1`}
                    text={t('nav.places_emergence')}
                  />
                </>
              ) : (
                <MenuItem href={ROUTE_PLACES} text={t('nav.places')} />
              )}

              <MenuItem href={ROUTE_PROJECT} text={t('nav.project')} />
              <MenuItem href={ROUTE_ACTU} text={t('nav.news')} />
              <MenuItem href={ROUTE_FAQ} text={t('nav.faq')} />
              <MenuItem href={ROUTE_CONTACT} text={t('nav.contact')} />
            </DrawerBody>
            <DrawerFooter
              justifyContent="center"
              borderTop="1px solid"
              borderColor="rgba(0, 0, 0, 0.1)"
            >
              {user ? (
                <AuthenticatedMenu isMobileMenu user={user} colorMode="black" />
              ) : (
                <>
                  <Link
                    href={ROUTE_SIGNUP}
                    lineHeight="1.2"
                    borderBottom="1px solid"
                    borderColor="transparent"
                    fontSize={{ base: 'sm', md: 'md' }}
                    _hover={{
                      borderColor: 'orange.500',
                    }}
                  >
                    {t('nav.signup')}
                  </Link>
                  <SigninModal>
                    <Button size="md" ml={7}>
                      {t('nav.signin')}
                    </Button>
                  </SigninModal>
                </>
              )}
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileMenu

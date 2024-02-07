import React from 'react'
import {
  Container,
  Image,
  HStack,
  Divider,
  Flex,
  MenuButton,
  Menu,
  MenuList,
  Portal,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import AuthMenu from '~components/AuthMenu'
import {
  ROUTE_PLACES,
  ROUTE_PROJECT,
  ROUTE_CONTACT,
  ROUTE_ACTU,
  ROUTE_FAQ,
} from '~constants'

import useCampaignContext from '~components/Campaign/useCampaignContext'
import {
  DropdownNavButton,
  NavButton,
} from '~components/Navigation/NavigationButtons'
import Debug from '~components/Navigation/Debug'

interface Props {
  colorMode: 'white' | 'black'
}

const Header = ({ colorMode }: Props) => {
  const { t } = useTranslation('common')
  const { currentCampaign } = useCampaignContext()

  return (
    <Container
      pos={colorMode === 'white' ? 'absolute' : 'static'}
      as="header"
      px={{ base: 3, md: 5 }}
      py={3}
      maxW="full"
      zIndex={10}
      borderBottom={
        colorMode === 'white' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'
      }
    >
      <Flex
        pos="relative"
        zIndex="10"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Image
            src={`/assets/img/logo-studio-d${
              colorMode === 'white' ? '-white' : ''
            }.svg`}
            cursor="pointer"
            alt="Logo Studio D"
            h={{
              base: '16px',
              sm: 'auto',
            }}
          />
        </Link>
        {process.env.NODE_ENV === 'development' && <Debug />}
        <HStack
          spacing={{ base: 0, md: 6 }}
          whiteSpace="nowrap"
          color={colorMode}
          alignItems="center"
        >
          {currentCampaign?.mode === 'applications' ? (
            <Menu>
              <MenuButton
                display={{
                  base: 'none',
                  lg: 'block',
                }}
              >
                {t('nav.places')}
              </MenuButton>
              <Portal>
                <MenuList rootProps={{ zIndex: 100 }}>
                  <DropdownNavButton href={`${ROUTE_PLACES}?tab=0`}>
                    {t('nav.places_regular')}
                  </DropdownNavButton>
                  <DropdownNavButton href={`${ROUTE_PLACES}?tab=1`}>
                    {t('nav.places_emergence')}
                  </DropdownNavButton>
                </MenuList>
              </Portal>
            </Menu>
          ) : (
            <NavButton href={ROUTE_PLACES} text={t('nav.places')} />
          )}

          <Divider
            orientation="vertical"
            opacity={0.6}
            h="18px"
            display={{
              base: 'none',
              lg: 'block',
            }}
          />
          <NavButton href={ROUTE_PROJECT} text={t('nav.project')} />
          <NavButton href={ROUTE_ACTU} text={t('nav.news')} />
          <NavButton href={ROUTE_FAQ} text={t('nav.faq')} />
          <NavButton href={ROUTE_CONTACT} text={t('nav.contact')} />
          <Divider
            orientation="vertical"
            opacity={0.6}
            h="18px"
            display={{
              base: 'none',
              lg: 'block',
            }}
          />
          <AuthMenu colorMode={colorMode} />
        </HStack>
      </Flex>
    </Container>
  )
}

export default Header

import React from 'react'
import { Container, Image, HStack, Text, Divider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import AuthMenu from '~components/AuthMenu'
import {
  ROUTE_PLACES,
  ROUTE_PROJECT,
  ROUTE_CONTACT,
  ROUTE_NEWS,
  ROUTE_FAQ,
} from '~constants'
import { useRouter } from 'next/router'

const MenuItem = ({ href, text }) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      borderBottom="1px solid"
      borderBottomColor={
        router.pathname === href ? 'orange.500' : 'transparent'
      }
      _hover={{
        borderColor: 'orange.500',
      }}
    >
      <Text>{text}</Text>
    </Link>
  )
}
interface IHeader {
  colorMode: 'white' | 'black'
}
const Header = ({ colorMode }: IHeader) => {
  const { t } = useTranslation('common')
  return (
    <Container
      pos={colorMode === 'white' ? 'absolute' : 'static'}
      as="header"
      display="flex"
      justifyContent="space-between"
      px={5}
      py={3}
      maxW="full"
      borderBottom={
        colorMode === 'white' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'
      }
    >
      <Link href="/">
        <Image
          src={`/assets/img/logo-studio-d${
            colorMode === 'white' ? '-white' : ''
          }.png`}
          cursor="pointer"
          alt="Logo Studio D"
        />
      </Link>
      <HStack
        spacing={6}
        whiteSpace="nowrap"
        color={colorMode}
        textShadow={colorMode === 'white' ? '1px 1px #797979' : ''}
      >
        <MenuItem href={ROUTE_PLACES} text={t('nav.places')} />
        <Divider orientation="vertical" opacity={0.6} />
        <MenuItem href={ROUTE_PROJECT} text={t('nav.project')} />
        <MenuItem href={ROUTE_NEWS} text={t('nav.news')} />
        <MenuItem href={ROUTE_FAQ} text={t('nav.faq')} />
        <MenuItem href={ROUTE_CONTACT} text={t('nav.contact')} />
        <Divider orientation="vertical" opacity={0.6} />
        <AuthMenu colorMode={colorMode} />
      </HStack>
    </Container>
  )
}

export default Header

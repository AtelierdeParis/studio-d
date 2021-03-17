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
      <HStack spacing={6} whiteSpace="nowrap" color={colorMode}>
        <Link href={ROUTE_PLACES}>
          <Text>{t('nav.places')}</Text>
        </Link>
        <Divider orientation="vertical" opacity={0.6} />
        <Link href={ROUTE_PROJECT}>
          <Text>{t('nav.project')}</Text>
        </Link>
        <Link href={ROUTE_NEWS}>
          <Text>{t('nav.news')}</Text>
        </Link>
        <Link href={ROUTE_FAQ}>
          <Text>{t('nav.faq')}</Text>
        </Link>
        <Link href={ROUTE_CONTACT}>
          <Text>{t('nav.contact')}</Text>
        </Link>
        <Divider orientation="vertical" opacity={0.6} />
        <AuthMenu />
      </HStack>
    </Container>
  )
}

export default Header

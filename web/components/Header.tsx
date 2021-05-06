import React from 'react'
import { Container, Image, HStack, Text, Divider, Flex } from '@chakra-ui/react'
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
import { useRouter } from 'next/router'

const MenuItem = ({ href, text }) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      lineHeight="1.2"
      borderBottom="1px solid"
      borderBottomColor={
        router.pathname === href ? 'orange.500' : 'transparent'
      }
      display={{
        base: 'none',
        lg: 'block',
      }}
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

const Header = ({ colorMode }: Props) => {
  const { t } = useTranslation('common')
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
        <HStack
          spacing={{ base: 0, md: 6 }}
          whiteSpace="nowrap"
          color={colorMode}
          alignItems="center"
        >
          <MenuItem href={ROUTE_PLACES} text={t('nav.places')} />
          <Divider
            orientation="vertical"
            opacity={0.6}
            h="18px"
            display={{
              base: 'none',
              lg: 'block',
            }}
          />
          <MenuItem href={ROUTE_PROJECT} text={t('nav.project')} />
          <MenuItem href={ROUTE_ACTU} text={t('nav.news')} />
          <MenuItem href={ROUTE_FAQ} text={t('nav.faq')} />
          <MenuItem href={ROUTE_CONTACT} text={t('nav.contact')} />
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

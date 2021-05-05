import React, { useEffect, useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Heading, Text, Container, Flex, Button, Image } from '@chakra-ui/react'
import { useTranslation, Trans } from 'next-i18next'
import { client } from '~api/client-api'
import Loading from '~components/Loading'
import Link from '~components/Link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Pending from 'public/assets/img/pending.svg'

const EmailConfirmation = ({ token }) => {
  const { t } = useTranslation('common')
  const [isLoading, setLoading] = useState(Boolean(token))
  const [isSuccess, setSuccess] = useState(true)

  useEffect(() => {
    client.auth
      .emailConfirmationList({
        confirmation: token,
      })
      .catch(() => {
        setSuccess(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container
      mx="auto"
      maxW="container.sm"
      fontSize={{ base: 'md', md: 'lg' }}
    >
      <NextSeo title={t('title.emailConfirmation')} />
      <Loading isLoading={isLoading}>
        {isSuccess ? (
          <>
            <Flex justifyContent="center" mt={{ base: 6, md: 16 }}>
              <Pending width="86px" height="86px" />
            </Flex>
            <Heading
              as="h1"
              textStyle="h1"
              textAlign="center"
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
              mt={2}
              mb={{ base: 4, md: 12 }}
            >
              {t('confirmEmail.title')}
            </Heading>
            <Text mb={{ base: 4, md: 14 }}>{t('confirmEmail.success')}</Text>
            <Button
              as={Link}
              href="/"
              alignSelf="center"
              mb={{ base: 0, md: 20 }}
              variant="unstyled"
              display="flex"
              alignItems="center"
            >
              <Image src="/assets/img/arrow.png" />
              <Text textDecoration="underline" color="gray.500" ml={4}>
                {t('confirmEmail.btn')}
              </Text>
            </Button>
          </>
        ) : (
          <>
            <Heading
              as="h1"
              textStyle="h1"
              layerStyle="mainTitle"
              textAlign="center"
            >
              {t('confirmEmail.error')}
            </Heading>
            <Button
              as={Link}
              href="/"
              alignSelf="center"
              mb={{ base: 0, md: 20 }}
              variant="unstyled"
              display="flex"
              alignItems="center"
            >
              <Image src="/assets/img/arrow.png" />
              <Text textDecoration="underline" color="gray.500" ml={4}>
                {t('confirmEmail.btn')}
              </Text>
            </Button>
          </>
        )}
      </Loading>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  // if (!query?.confirmation)
  //   return { redirect: { destination: '/', permanent: false } }
  return {
    props: {
      token: query?.confirmation || null,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default EmailConfirmation

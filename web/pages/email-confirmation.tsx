import React, { useEffect, useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Heading, Text, Container } from '@chakra-ui/react'
import { useTranslation, Trans } from 'next-i18next'
import { client } from '~api/client-api'
import Loading from '~components/Loading'
import Link from '~components/Link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const EmailConfirmation = ({ token }) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [isLoading, setLoading] = useState(Boolean(token))
  const [isSuccess, setSuccess] = useState(true)
  useEffect(() => {
    client.auth
      .emailConfirmationList({
        confirmation: token,
      })
      .then(() => {
        setTimeout(() => {
          router.push('/')
        }, 1000)
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
      <Heading
        as="h1"
        textStyle="h1"
        layerStyle="mainTitle"
        textAlign="center"
        maxW="container.sm"
        mx="auto"
      >
        {t('confirmEmail.title')}
      </Heading>
      <Loading isLoading={isLoading}>
        {isSuccess ? (
          <Text textAlign="center" whiteSpace="pre-line">
            <Trans
              i18nKey={'common:confirmEmail.success'}
              components={{
                a: (
                  <Link href="/" color="blue.500" textDecoration="underline" />
                ),
              }}
            />
          </Text>
        ) : (
          <Text textAlign="center">{t('confirmEmail.error')}</Text>
        )}
      </Loading>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  if (!query?.confirmation)
    return { redirect: { destination: '/', permanent: false } }
  return {
    props: {
      token: query?.confirmation || null,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default EmailConfirmation

import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button, Container, Heading, VStack, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import FormField from '~components/FormField'
import InputPassword from '~components/InputPassword'
import useToast from '~hooks/useToast'
import { client } from '~api/client-api'
import { ROUTE_ACCOUNT_INFORMATION } from '~constants'
import MigrationMessage from '~components/MigrationMessage'
import { signIn } from 'next-auth/client'
import { NextSeo } from 'next-seo'

interface Props {
  code: string
  isMigration: string
}

const schema = yup.object().shape({
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
})

const CreatePassword = ({ code, isMigration }: Props) => {
  const { errorToast, successToast } = useToast()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('reset')

  const { handleSubmit, register, errors, setError } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    if (data.password !== data.passwordConfirmation) {
      return setError('password', {
        type: 'manual',
        message: t('errorDifferent'),
      })
    }
    setLoading(true)
    client.auth
      .resetPassword({
        ...data,
        code,
      })
      .then(async (res) => {
        successToast(t('success'))

        if (isMigration && res.data.email) {
          await signIn('credentials', {
            username: res.data.email,
            password: data.password,
            redirect: false,
          })
          router.push(ROUTE_ACCOUNT_INFORMATION)
        } else {
          router.push('/')
        }
      })
      .catch(() => errorToast(t('common:error')))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <NextSeo title={t('common:title.resetPassword')} />
      {isMigration && (
        <MigrationMessage
          mt={8}
          title={t('migration.title')}
          message={t('migration.message')}
        />
      )}
      <Container maxW="container.sm" px={0}>
        <Heading
          as="h1"
          textStyle="h1"
          layerStyle="mainTitle"
          textAlign="center"
        >
          {t('title')}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} mb={{ base: 4, md: 10 }}>
            <FormField
              label={t('password.label')}
              info={t('password.info')}
              errors={errors.password}
              isRequired
            >
              <InputPassword
                register={register}
                placeholder={t('password.placeholder')}
              />
            </FormField>
            <FormField
              label={t('passwordConfirmation.label')}
              errors={errors.passwordConfirmation}
              isRequired
            >
              <InputPassword
                register={register}
                name="passwordConfirmation"
                placeholder={t('passwordConfirmation.placeholder')}
              />
            </FormField>
          </VStack>
          <Flex justifyContent="center">
            <Button
              colorScheme="blue"
              type="submit"
              size="xl"
              isLoading={isLoading}
            >
              {t('submit')}
            </Button>
          </Flex>
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  if (!query?.code) {
    return { redirect: { destination: '/', permanent: false } }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'reset'])),
      code: query.code,
      isMigration: query?.ismigration ? Boolean(query?.ismigration) : false,
    },
  }
}

export default CreatePassword

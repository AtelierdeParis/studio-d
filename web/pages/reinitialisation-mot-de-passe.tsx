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

interface ICreatePassword {
  code: string
}

const schema = yup.object().shape({
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
})

const CreatePassword = ({ code }: ICreatePassword) => {
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
      .then(() => {
        successToast(t('success'))
        router.push('/')
      })
      .catch(() => errorToast(t('common:error')))
      .finally(() => setLoading(false))
  }
  return (
    <Container maxW="container.sm" px={0}>
      <Heading as="h1" textStyle="h1" layerStyle="mainTitle" textAlign="center">
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
    },
  }
}

export default CreatePassword

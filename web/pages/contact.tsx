import React, { useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Text,
  Input,
  Textarea,
  Button,
  Container,
  Heading,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import FormField from '~components/FormField'
import MessageSent from '~components/MessageSent'
import useToast from '~hooks/useToast'
import { createMessage } from '~api/api'

const schema = yup.object().shape({
  name: yup.string().required(),
  message: yup.string().required(),
  from: yup.string().email().required(),
})

const Contact: NextPage = () => {
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [isSent, setSent] = useState(false)
  const { t } = useTranslation('contact')

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  })

  if (isSent) return <MessageSent />

  const onSubmit = (data) => {
    setLoading(true)
    createMessage(data)
      .then(() => setSent(true))
      .catch(() => errorToast(t('error')))
      .finally(() => setLoading(false))
  }
  return (
    <Container maxW="container.sm">
      <Heading as="h1" textStyle="h1" mt={16} mb={12} textAlign="center">
        {t('title')}
      </Heading>
      <Text mb={10}>{t('description')}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} mb={10}>
          <FormField label={t('name.label')} errors={errors.name} isRequired>
            <Input
              name="name"
              ref={register}
              placeholder={t('name.placeholder')}
            />
          </FormField>
          <FormField label={t('email.label')} errors={errors.email} isRequired>
            <Input
              type="email"
              name="from"
              placeholder={t('email.placeholder')}
              ref={register}
            />
          </FormField>
          <FormField label={t('message.label')} isRequired>
            <Textarea
              resize="none"
              name="message"
              h="160px"
              ref={register}
              placeholder={t('message.placeholder')}
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

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  }
}

export default Contact

import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { client } from '~api/client-api'
import FormField from '~components/FormField'
import MessageSent from '~components/MessageSent'
import { ROUTE_CONTACT } from '~constants'
import useToast from '~hooks/useToast'
import { Page } from '~typings/api'
import { getPage } from '~utils/page'

const Contact = ({ page }: { page?: Page }) => {
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [isSent, setSent] = useState(false)
  const { t } = useTranslation('contact')

  const schema = yup.object().shape({
    name: yup.string().required(t('yup:mixed.required')),
    message: yup.string().required(t('yup:mixed.required')),
    from: yup
      .string()
      .email(t('yup:string.email'))
      .required(t('yup:mixed.required')),
  })

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  })

  if (isSent) return <MessageSent />

  const onSubmit = (data) => {
    setLoading(true)
    client.contacts
      .contactsCreate(data)
      .then(() => setSent(true))
      .catch(() => errorToast(t('error')))
      .finally(() => setLoading(false))
  }

  return (
    <Container maxW="container.sm" px={0}>
      <NextSeo title={t('common:title.contact')} />
      <Heading as="h1" textStyle="h1" layerStyle="mainTitle" textAlign="center">
        {page?.title || t('title')}
      </Heading>
      {page?.text && <Text mb={{ base: 5, md: 10 }}>{page.text}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={{ base: 4, md: 6 }} mb={{ base: 4, md: 10 }}>
          <FormField label={t('name.label')} errors={errors.name} isRequired>
            <Input
              name="name"
              ref={register}
              placeholder={t('name.placeholder')}
            />
          </FormField>
          <FormField label={t('email.label')} errors={errors.from} isRequired>
            <Input
              type="email"
              name="from"
              placeholder={t('email.placeholder')}
              ref={register}
            />
          </FormField>
          <FormField
            label={t('message.label')}
            errors={errors.message}
            isRequired
          >
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
  const page = await getPage(ROUTE_CONTACT)

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale, ['common', 'contact', 'yup'])),
    },
  }
}

export default Contact

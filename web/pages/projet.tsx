import React, { useState, useEffect } from 'react'
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
import FormField from '~components/FormField'
import { ROUTE_PROJECT } from '~constants'
import useToast from '~hooks/useToast'
import { getPage } from '~api/api'

const Project: NextPage = ({ page }) => {
  console.log(page)
  return (
    <Container maxW="container.sm">
      <Heading as="h1" textStyle="h1" mt={16} mb={12} textAlign="center">
        {page.title}
      </Heading>
      <Text mb={10}>{marked(page.text)}</Text>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  const page = await getPage(2).then((res) => res.data)

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  }
}

export default Project

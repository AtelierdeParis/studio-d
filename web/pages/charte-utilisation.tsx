import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Heading } from '@chakra-ui/react'
import MarkdownRenderer from '~components/MarkdownRenderer'
import { ROUTE_USE_POLICY } from '~constants'
import { client } from '~api/client-api'
import { Page } from '~typings/api'

interface ICharte {
  page: Page
}

const Charte = ({ page }: ICharte) => {
  return (
    <Container>
      <Heading
        as="h1"
        textStyle="h1"
        mt={16}
        mb={12}
        textAlign="center"
        maxW="container.sm"
        mx="auto"
      >
        {page.title}
      </Heading>
      <MarkdownRenderer>{page.text}</MarkdownRenderer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  const page = await client.pages.pagesDetail(ROUTE_USE_POLICY).then((res) => res.data)

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Charte

import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Heading } from '@chakra-ui/react'
import MarkdownRenderer from '~components/MarkdownRenderer'
import { ROUTE_PROJECT } from '~constants'
import { Page } from '~typings/api'
import { getPage } from '~utils/page'

interface IProject {
  page: Page
}

const Project = ({ page }: IProject) => {
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
  const page = await getPage(ROUTE_PROJECT)

  if (!page) return { redirect: { destination: '/', permanent: false } }

  return {
    props: {
      page,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Project

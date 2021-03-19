import { Box, Flex, Heading, Container } from '@chakra-ui/react'
import React from 'react'
import { SSRConfig, useTranslation } from 'next-i18next'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PlaceOrCompany from '~components/Signup/PlaceOrCompany'

const Home: NextPage = () => {
  const { t } = useTranslation('home')
  return (
    <Box>
      <Flex
        backgroundColor="mainBackground"
        backgroundImage="url(/assets/img/home-background.jpg)"
        direction="column"
        backgroundPosition="center"
        backgroundSize="cover"
        justifyContent="flex-end"
        alignItems="center"
        h="45vh"
      >
        <Heading as="h1" textStyle="h1" color="white" mb={7} whiteSpace="pre">
          {t('title')}
        </Heading>
      </Flex>
      <Container>
        <PlaceOrCompany />
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'common'])),
    },
  }
}

export default Home

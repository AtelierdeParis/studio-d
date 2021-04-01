import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PlaceOrCompany from '~components/Signup/PlaceOrCompany'
import HomeCarousel from '~components/Home/HomeCarousel'

const Home: NextPage = () => {
  return (
    <Box>
      <HomeCarousel />
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
      ...(await serverSideTranslations(locale, ['home', 'common', 'yup'])),
    },
  }
}

export default Home

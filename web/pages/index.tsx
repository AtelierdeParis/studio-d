import { Box, Container, VStack } from '@chakra-ui/react'
import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PlaceOrCompany from '~components/Signup/PlaceOrCompany'
import HomeCarousel from '~components/Home/HomeCarousel'
import HomePlaces from '~components/Home/HomePlaces'
import HomeActus from '~components/Home/HomeActus'
import HomeMessage from '~components/Home/HomeMessage'
import { useSession } from 'next-auth/client'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  return (
    <Box>
      <HomeCarousel />
      <HomeMessage />
      <Container py={20}>
        <VStack alignItems="flex-start" w="100%" spacing={22}>
          {!loading && !session && <PlaceOrCompany />}
          <HomePlaces />
          <HomeActus />
        </VStack>
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',
        'common',
        'yup',
        'place',
        'actuality',
      ])),
    },
  }
}

export default Home

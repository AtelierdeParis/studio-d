import { Box, Heading, Text } from '@chakra-ui/react'
import React, { useState, useMemo, useEffect } from 'react'
import { SSRConfig } from 'next-i18next'
import router, { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PlaceOrCompany from '~components/Signup/PlaceOrCompany'
import SignupSteps from '~components/Signup/SignupSteps'
import AboutUs from '~components/Signup/AboutUs'
import SignupForm from '~components/Signup/SignupForm'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Box>
      <SignupSteps step={1} />
      <PlaceOrCompany />
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signup', 'common'])),
    },
  }
}

export default Home

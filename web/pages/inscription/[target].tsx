import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SignupSteps from '~components/Signup/SignupSteps'
import AboutUs from '~components/Signup/AboutUs'
import SignupForm from '~components/Signup/SignupForm'
import SignupCompleted from '~components/Signup/SignupCompleted'

export type Target = 'compagnie' | 'lieu'
const availableTargets = ['compagnie', 'lieu']

const Home: NextPage = () => {
  const [skipCondition, setSkip] = useState(false)
  const router = useRouter()
  const [isCompleted, setComplete] = useState(false)

  const onSuccess = () => setComplete(true)

  useEffect(() => {
    if (
      !router.query.target ||
      !availableTargets.includes(router.query.target as string)
    ) {
      router.push('/')
    }
  }, [router.query.target])

  if (isCompleted) return <SignupCompleted />

  return (
    <Box>
      <SignupSteps
        step={skipCondition ? 3 : 2}
        target={router.query.target as Target}
      />
      {skipCondition ? (
        <SignupForm
          target={router.query.target as Target}
          onSuccess={onSuccess}
        />
      ) : (
        <AboutUs onClick={setSkip} />
      )}
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

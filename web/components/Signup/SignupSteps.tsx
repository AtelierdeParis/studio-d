import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Heading, Text } from '@chakra-ui/react'

interface ISignupSteps {
  step: number
  target?: 'lieu' | 'compagnie'
}

const SignupSteps = ({ step, target }: ISignupSteps) => {
  const { t } = useTranslation()
  return (
    <>
      <Heading
        as="h1"
        textStyle="h1"
        whiteSpace="pre"
        mt={{ base: 6, md: 16 }}
        fontSize={{ base: 'xl', md: '3xl' }}
        textAlign="center"
      >
        {t('signup:title')}
        {target && (
          <Text as="span" pl={2} color="gray.500">
            {t(`signup:${target}`)}
          </Text>
        )}
      </Heading>
      <Text
        textAlign="center"
        color="gray.500"
        fontSize={{ base: 'md', md: 'lg' }}
        mt={1}
        mb={{ base: 4, md: 10 }}
      >
        {t('signup:step', { step })}
      </Text>
    </>
  )
}

export default SignupSteps

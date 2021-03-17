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
        mt={16}
        textAlign="center"
      >
        {t('signup:title')}
        {target && (
          <Text as="span" pl={2} color="gray.500">
            {t(`signup:${target}`)}
          </Text>
        )}
      </Heading>
      <Text textAlign="center" color="gray.500" fontSize="lg" mt={1} mb={10}>
        {t('signup:step', { step })}
      </Text>
    </>
  )
}

export default SignupSteps

import React from 'react'
import { Flex, Heading, Text, Button, Image } from '@chakra-ui/react'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'
import Letter from 'public/assets/img/confirm-email.svg'

const SignupCompleted = () => {
  const { t } = useTranslation('signup')
  return (
    <Flex maxW="38rem" m="0 auto" direction="column">
      <Flex justifyContent="center" mt={{ base: 6, md: 16 }}>
        <Letter width="95px" height="95px" />
      </Flex>
      <Heading
        as="h1"
        textStyle="h1"
        textAlign="center"
        fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
        mt={2}
        mb={{ base: 4, md: 12 }}
      >
        {t('completed.title')}
      </Heading>
      <Text mb={{ base: 4, md: 14 }}>{t('completed.text')}</Text>
      <Button
        as={Link}
        href="/"
        alignSelf="center"
        mb={{ base: 0, md: 20 }}
        variant="unstyled"
        display="flex"
        alignItems="center"
      >
        <Image src="/assets/img/arrow.png" />
        <Text textDecoration="underline" color="gray.500" ml={4}>
          {t('completed.btn')}
        </Text>
      </Button>
    </Flex>
  )
}

export default SignupCompleted

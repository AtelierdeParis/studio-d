import React from 'react'
import { Flex, Heading, Text, Button, Image } from '@chakra-ui/react'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'

const MessageSent = () => {
  const { t } = useTranslation('contact')
  return (
    <Flex maxW="38rem" m="0 auto" direction="column">
      <Heading
        as="h1"
        textStyle="h1"
        whiteSpace="pre"
        mt={16}
        mb={12}
        textAlign="center"
      >
        {t('sent.title')}
      </Heading>
      <Text mb={14}>{t('sent.text')}</Text>
      <Button
        as={Link}
        href="/"
        alignSelf="center"
        mb={20}
        variant="unstyled"
        display="flex"
        alignItems="center"
      >
        <Image src="/assets/img/arrow.png" />
        <Text textDecoration="underline" color="gray.500" ml={4}>
          {t('sent.btn')}
        </Text>
      </Button>
    </Flex>
  )
}

export default MessageSent

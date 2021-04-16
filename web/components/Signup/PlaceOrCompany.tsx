import React from 'react'
import { useTranslation } from 'next-i18next'
import { HStack, Box, Text, Button, Flex } from '@chakra-ui/react'
import Link from '~components/Link'
import { ROUTE_SIGNUP } from '~constants'

interface IBlock {
  title: string
  description: string
  btn: string
  url?: string
}
const Block = ({ title, description, btn, url }: IBlock) => {
  return (
    <Flex
      flex={1}
      backgroundColor="blue.50"
      py={12}
      px={20}
      borderRadius="lg"
      direction="column"
      justifyContent="space-between"
      lineHeight="1.55"
    >
      <Box>
        <Text textAlign="center" mb={7} fontSize="1.7rem">
          {title}
        </Text>
        <Text color="gray.500">{description}</Text>
      </Box>
      <Button
        as={Link}
        href={url}
        colorScheme="blue"
        size="lg"
        alignSelf="center"
        mt={8}
      >
        {btn}
      </Button>
    </Flex>
  )
}

const PlaceOrCompany = () => {
  const { t } = useTranslation('common')
  return (
    <HStack spacing={5} alignItems="stretch">
      <Block
        title={t('signup.place.title')}
        description={t('signup.place.description')}
        btn={t('signup.place.btn')}
        url={`${ROUTE_SIGNUP}/lieu`}
      />
      <Block
        title={t('signup.company.title')}
        description={t('signup.company.description')}
        btn={t('signup.company.btn')}
        url={`${ROUTE_SIGNUP}/compagnie`}
      />
    </HStack>
  )
}

export default PlaceOrCompany

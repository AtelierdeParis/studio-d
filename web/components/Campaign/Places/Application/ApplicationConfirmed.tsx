import React from 'react'
import {
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Center,
} from '@chakra-ui/react'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_APPLICATIONS } from '~constants'

const ApplicationConfirmed = ({ structureName }) => {
  const { t } = useTranslation('place')

  return (
    <Flex maxW="38rem" m="0 auto" direction="column" px={3}>
      <Heading as="h1" textStyle="h1" layerStyle="mainTitle" textAlign="center">
        {t('campaignApplication.confirmed.title')}
      </Heading>
      <Text mb={{ base: 6, md: 14 }}>
        {t('campaignApplication.confirmed.text', {
          place: structureName,
        })}
      </Text>
      <Center>
        <ButtonGroup>
          <Button
            as={Link}
            href="/"
            alignSelf="center"
            mb={{ base: 0, md: 20 }}
            variant="unstyled"
            display="flex"
            alignItems="center"
          >
            <Text textDecoration="underline" color="gray.500" ml={4}>
              {t('campaignApplication.confirmed.back')}
            </Text>
          </Button>
          <Button
            as={Link}
            href={ROUTE_ACCOUNT_APPLICATIONS}
            alignSelf="center"
            mb={{ base: 0, md: 20 }}
            variant="lineBlue"
            display="flex"
            alignItems="center"
          >
            {t('campaignApplication.confirmed.see_applications')}
          </Button>
        </ButtonGroup>
      </Center>
    </Flex>
  )
}

export default ApplicationConfirmed

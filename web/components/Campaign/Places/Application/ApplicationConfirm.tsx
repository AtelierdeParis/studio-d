import React from 'react'
import { Flex, Heading, Text, Button, Image } from '@chakra-ui/react'
import Link from '~components/Link'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const ApplicationConfirmed = ({ structureName }) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  return (
    <Flex maxW="38rem" m="0 auto" direction="column" px={3}>
      <Heading as="h1" textStyle="h1" layerStyle="mainTitle" textAlign="center">
        {t('campaignApplication.confirmed.title')}
      </Heading>
      <Text mb={{ base: 6, md: 14 }}>
        {t('campaignApplication.confirmed.text', {
          name: currentCampaign.title,
        })}
      </Text>
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
          {t('campaignApplication.confirmed.back')}
        </Text>
      </Button>
    </Flex>
  )
}

export default ApplicationConfirmed

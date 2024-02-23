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
import { ROUTE_ACCOUNT_MY_APPLICATIONS } from '~constants'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const ApplicationConfirmed = () => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()

  return (
    <Flex maxW="38rem" m="0 auto" direction="column" px={3}>
      <Heading as="h1" textStyle="h1" layerStyle="mainTitle" textAlign="center">
        {t('campaignApplication.confirmed.title')}
      </Heading>
      <Text mb={{ base: 6, md: 14 }}>
        {t('campaignApplication.confirmed.text', {
          campaign: currentCampaign?.title,
          preselection_start: format(
            currentCampaign?.preselection_start,
            'dd/MM',
          ),
          preselection_end: format(currentCampaign?.preselection_end, 'dd/MM'),
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
            href={ROUTE_ACCOUNT_MY_APPLICATIONS}
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

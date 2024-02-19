import {
  HStack,
  Text,
  Flex,
  Button,
  StackProps,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationCounter from '~components/Campaign/ApplicationCounter'
import { ActiveCampaign } from '~components/Campaign/CampaignContext'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'

const PlacesListCampaignHelper = ({
  campaign,
  limitLines,
  ...props
}: { campaign?: ActiveCampaign; limitLines?: boolean } & StackProps) => {
  const { t } = useTranslation('common')

  return (
    <VStack
      backgroundColor={campaign ? 'campaign.light' : 'blue.200'}
      borderRadius="4px"
      borderTopLeftRadius={0}
      paddingX={8}
      paddingY={4}
      marginBottom={4}
      spacing={'1rem'}
      id="hello"
      {...props}
    >
      {campaign && <ApplicationCounter borderBottom="1px solid lightgray" />}
      <HStack>
        <VStack flex={4} justifyContent="flex-start" alignItems="flex-start">
          <Text as="span" fontWeight="bold" marginRight={1}>
            {campaign
              ? t('campaign.helper_title', { title: campaign?.title })
              : t('solidarity.helper_title')}
          </Text>
          <Text noOfLines={limitLines ? { base: 4, md: 3, lg: 2 } : undefined}>
            {campaign ? campaign.description : t('solidarity.helper')}
          </Text>
        </VStack>
        <Flex flex={1} justifyContent="flex-end">
          <Button
            variant={campaign ? 'campaign' : 'blueFill'}
            as={Link}
            href={
              campaign?.mode === 'applications'
                ? `${ROUTE_PLACES}?tab=1`
                : `${ROUTE_PLACES}?tab=0`
            }
          >
            {t('show')}
          </Button>
        </Flex>
      </HStack>
    </VStack>
  )
}

export default PlacesListCampaignHelper

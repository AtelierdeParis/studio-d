import { Text, Flex, Button, StackProps, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationCounter from '~components/Campaign/ApplicationCounter'
import { CampaignDetailed } from '~components/Campaign/CampaignContext'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'

const PlacesListCampaignHelper = ({
  campaign,
  limitLines,
  isHome,
  ...props
}: {
  campaign?: CampaignDetailed
  limitLines?: boolean
  isHome?: boolean
} & StackProps) => {
  const { t } = useTranslation('common')

  return (
    <VStack
      backgroundColor={campaign ? 'campaign.light' : 'blue.200'}
      borderRadius="4px"
      borderTopLeftRadius={isHome ? undefined : 0}
      paddingX={8}
      paddingY={4}
      marginBottom={4}
      spacing={'1rem'}
      height={!isHome ? '100%' : 'auto'}
      {...props}
    >
      {campaign && !isHome && (
        <ApplicationCounter borderBottom="1px solid lightgray" />
      )}
      <Stack
        width="100%"
        spacing={6}
        direction={isHome ? { base: 'column', sm: 'row' } : 'column'}
      >
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
        <Flex
          flex={1}
          justifyContent={
            isHome ? { base: 'flex-start', sm: 'flex-end' } : 'flex-end'
          }
        >
          <Button
            variant={campaign ? 'campaign' : 'blueFill'}
            as={Link}
            href={
              campaign
                ? campaign?.article_link
                  ? campaign?.article_link
                  : `${ROUTE_PLACES}?tab=1`
                : `${ROUTE_PLACES}?tab=0`
            }
          >
            {t('show')}
          </Button>
        </Flex>
      </Stack>
    </VStack>
  )
}

export default PlacesListCampaignHelper

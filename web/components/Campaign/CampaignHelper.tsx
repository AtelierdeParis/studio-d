import { HStack, Text, Flex, Button, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ActiveCampaign } from '~components/Campaign/CampaignContext'

const CampaignHelper = ({
  campaign,
  ...props
}: { campaign?: ActiveCampaign } & StackProps) => {
  const { t } = useTranslation('common')

  return (
    <HStack
      backgroundColor={campaign ? 'campaign.light' : 'blue.200'}
      borderRadius="sm"
      paddingX={8}
      paddingY={2}
      marginBottom={4}
      {...props}
    >
      <Text flex={4}>
        <Text as="span" fontWeight="bold" marginRight={1}>
          {campaign ? campaign?.title : t('solidarity.helper_title')}
        </Text>
        {campaign ? campaign.description : t('solidarity.helper')}
      </Text>
      <Flex flex={1} justifyContent="flex-end">
        <Button variant={campaign ? 'campaign' : 'blueFill'}>
          {t('show')}
        </Button>
      </Flex>
    </HStack>
  )
}

export default CampaignHelper

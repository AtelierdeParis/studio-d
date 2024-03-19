import { Text, Flex, Button, StackProps, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationCounter from '~components/Campaign/ApplicationCounter'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'

const PlacesListCampaignHelper = (props: StackProps) => {
  const { t } = useTranslation('common')
  const { currentCampaign } = useCampaignContext()

  return (
    <VStack
      backgroundColor={'campaign.light'}
      borderRadius="4px"
      borderTopLeftRadius={0}
      paddingX={8}
      paddingY={4}
      marginBottom={4}
      spacing={'1rem'}
      height="100%"
      {...props}
    >
      <ApplicationCounter borderBottom="1px solid lightgray" />
      <Stack width="100%" spacing={6} direction={'column'}>
        <VStack flex={4} justifyContent="flex-start" alignItems="flex-start">
          <Text as="span" fontWeight="bold" marginRight={1}>
            {t('campaign.helper_title', { title: currentCampaign?.title })}
          </Text>
          <Text>{currentCampaign.description}</Text>
        </VStack>
        <Flex flex={1} justifyContent={'flex-end'} alignItems="center">
          <Button
            variant={'campaign'}
            as={Link}
            href={currentCampaign?.article_link}
          >
            {t('show')}
          </Button>
        </Flex>
      </Stack>
    </VStack>
  )
}

export default PlacesListCampaignHelper

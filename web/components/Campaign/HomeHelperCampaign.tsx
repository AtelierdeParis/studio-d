import { Text, Flex, Button, StackProps, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import { ROUTE_PLACES } from '~constants'

const HomeHelperCampaign = (props: StackProps) => {
  const { t } = useTranslation('common')
  const { currentCampaign } = useCampaignContext()

  return (
    <VStack
      backgroundColor={'campaign.light'}
      borderRadius="4px"
      borderTopLeftRadius={undefined}
      paddingX={8}
      paddingY={4}
      marginBottom={4}
      spacing={'1rem'}
      height={'auto'}
      {...props}
    >
      <Stack width="100%" spacing={6} direction={{ base: 'column', sm: 'row' }}>
        <VStack flex={4} justifyContent="flex-start" alignItems="flex-start">
          <Text as="span" fontWeight="bold" marginRight={1}>
            {t('campaign.helper_title', { title: currentCampaign?.title })}
          </Text>
          <Text noOfLines={{ base: 4, md: 3, lg: 2 }}>
            {currentCampaign.description}
          </Text>
        </VStack>
        <Flex
          flex={1}
          justifyContent={{ base: 'flex-start', sm: 'flex-end' }}
          alignItems="center"
        >
          <Button
            variant={'campaign'}
            as={Link}
            href={currentCampaign?.article_link || `${ROUTE_PLACES}?tab=1`}
          >
            {t('show')}
          </Button>
        </Flex>
      </Stack>
    </VStack>
  )
}

export default HomeHelperCampaign

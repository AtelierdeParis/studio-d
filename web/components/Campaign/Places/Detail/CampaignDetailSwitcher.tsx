import { Text, Box, Stack, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const CampaignDetailSwitcher = ({
  isCampaignTab,
}: {
  isCampaignTab: boolean
}) => {
  const router = useRouter()

  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  return (
    <Stack
      borderRadius="4px"
      backgroundColor={isCampaignTab ? 'blue.100' : 'campaign.light'}
      p={4}
      marginTop={4}
      spacing={8}
      paddingX={6}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box flex={1}>
        <Text as="span" fontWeight="bold">
          {t(
            `detail.campaign.${
              isCampaignTab
                ? 'switch_solidarity_title'
                : 'switch_campaign_title'
            }`,
            { title: currentCampaign?.title },
          )}
        </Text>
        <Text as="span" pl={1}>
          {t(
            `detail.campaign.${
              isCampaignTab
                ? 'switch_solidarity_content'
                : 'switch_campaign_content'
            }`,
          )}
        </Text>
      </Box>
      <Button
        variant={isCampaignTab ? 'outline' : 'campaign'}
        colorScheme={isCampaignTab && 'blue'}
        size="xl"
        onClick={() => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, tab: isCampaignTab ? '0' : '1' },
          })
        }}
      >
        {t(
          `detail.campaign.${
            isCampaignTab ? 'switch_campaign_cta' : 'switch_solidarity_cta'
          }`,
          { title: currentCampaign?.title },
        )}
      </Button>
    </Stack>
  )
}

export default CampaignDetailSwitcher

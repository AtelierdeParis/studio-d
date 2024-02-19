import { VStack, Text, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import BooleanField from '~components/Campaign/Places/Application/Inputs/BooleanField'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import MarkdownRenderer from '~components/MarkdownRenderer'

const ApplicationEligibility = () => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')
  return (
    <VStack width="100%" alignItems="stretch" spacing={8}>
      <ApplicationFormTitle
        title={t('campaignApplication.eligibility.title')}
        position="4."
      />

      {currentCampaign?.chart_url && (
        <Text>
          <Text as="span">
            {t('campaignApplication.eligibility.chart_front')}
          </Text>
          <Button
            as={Link}
            pl={1}
            href={currentCampaign?.chart_url}
            variant="lineBlue"
          >
            {t('campaignApplication.eligibility.chart')}
          </Button>
          <Text as="span" pl={1}>
            {t('campaignApplication.eligibility.chart_back')}
          </Text>
        </Text>
      )}

      <MarkdownRenderer>{currentCampaign?.eligibility}</MarkdownRenderer>

      <BooleanField
        name="eligibility"
        label={t('campaignApplication.eligibility.label')}
      />
    </VStack>
  )
}

export default ApplicationEligibility
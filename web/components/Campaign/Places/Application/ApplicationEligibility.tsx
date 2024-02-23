import { VStack, Text, Button, Box } from '@chakra-ui/react'
import Link from '~components/Link'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import MarkdownRenderer from '~components/MarkdownRenderer'
import { useTranslation } from 'next-i18next'
import CheckboxField from '~components/Campaign/Places/Application/Inputs/CheckboxField'

const ApplicationEligibility = () => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  return (
    <VStack width="100%" alignItems="stretch" spacing={8}>
      {currentCampaign?.eligibility && (
        <>
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
        </>
      )}

      <CheckboxField
        name="eligibility"
        label={
          <Box>
            <Text as="span">
              {t(
                currentCampaign?.eligibility
                  ? 'campaignApplication.eligibility.label_start'
                  : 'campaignApplication.eligibility.no_eligibility_label_start',
              )}
            </Text>

            <Text
              color="blue.500"
              as={Link}
              target="_blank"
              textDecoration="underline"
              href={currentCampaign?.chart_url}
            >
              {t('campaignApplication.eligibility.label_cgu')}
            </Text>
            <Text as="span" pl={1}>
              {t('campaignApplication.eligibility.label_end', {
                title: currentCampaign?.title,
              })}
            </Text>
          </Box>
        }
      />
    </VStack>
  )
}

export default ApplicationEligibility

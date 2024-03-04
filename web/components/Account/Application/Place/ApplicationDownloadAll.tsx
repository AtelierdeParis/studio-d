import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDownloadApplication } from '~hooks/useDownloadApplication'
import { useMyApplications } from '~hooks/useMyApplications'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const ApplicationDownloadAll = () => {
  const { selectedCampaign } = useSelectedCampaign()
  const { t } = useTranslation('application')
  const { query } = useRouter()

  const { data: applications, isLoading, isFetching } = useMyApplications({
    name: ['myApplications', query?.disponibility as string],
    campaignId: query.campaign as string,
    searchParams: { ...query, _sort: 'company.structureName:asc' },
    options: {
      enabled: Boolean(query?.disponibility) && Boolean(query?.espace),
    },
  })

  if (['disponibilities', 'applications']?.includes(selectedCampaign?.mode)) {
    return null
  }

  // test single application pdf generation
  const { downloadApplication } = useDownloadApplication(applications[0]?.id)

  return (
    <Box p={{ base: 2, sm: 4 }}>
      <Button
        colorScheme={selectedCampaign?.mode === 'closed' ? 'gray' : 'blue'}
        backgroundColor={
          selectedCampaign?.mode === 'closed' ? 'gray.700' : undefined
        }
        color={'white'}
        size="lg"
        isLoading={isLoading || isFetching}
        isFullWidth
        onClick={downloadApplication}
      >
        {t('place.download')}
      </Button>
    </Box>
  )
}

export default ApplicationDownloadAll

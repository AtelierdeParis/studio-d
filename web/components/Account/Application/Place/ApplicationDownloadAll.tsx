import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMyApplications } from '~hooks/useMyApplications'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const ApplicationDownloadAll = () => {
  const { selectedCampaign } = useSelectedCampaign()
  const { t } = useTranslation('application')
  const { query } = useRouter()

  const { data: applications, isLoading, isFetching } = useMyApplications({
    name: ['myApplications', query?.disponibility as string],
    searchParams: { ...query, _sort: 'company.structureName:asc' },
    options: {
      enabled: Boolean(query?.disponibility) && Boolean(query?.espace),
    },
  })

  if (['disponibilities', 'applications']?.includes(selectedCampaign?.mode)) {
    return null
  }

  return (
    <Box p={{ base: 2, sm: 4 }}>
      <Button
        as="a"
        href={`/api/pdfs/all/${applications?.[0]?.disponibility.id}`}
        target='_blank'
        colorScheme={selectedCampaign?.mode === 'closed' ? 'gray' : 'blue'}
        backgroundColor={
          selectedCampaign?.mode === 'closed' ? 'gray.700' : undefined
        }
        color={'white'}
        size="lg"
        isLoading={isLoading || isFetching}
        isDisabled={!applications?.length}
        isFullWidth
      >
        {t('place.download')}
      </Button>
    </Box>
  )
}

export default ApplicationDownloadAll

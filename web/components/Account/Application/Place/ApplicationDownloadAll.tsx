import { Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMyApplications } from '~hooks/useMyApplications'
import useSelectedCampaign from '~hooks/useSelectedCampaign'
import useToast from '~hooks/useToast'
import { handleDisponibilityDownload } from '~utils/pdf'

const ApplicationDownloadAll = () => {
  const { selectedCampaign } = useSelectedCampaign()
  const { errorToast } = useToast()
  const { t } = useTranslation('application')
  const { query } = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)
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
        colorScheme={selectedCampaign?.mode === 'closed' ? 'gray' : 'blue'}
        backgroundColor={
          selectedCampaign?.mode === 'closed' ? 'gray.700' : undefined
        }
        color={'white'}
        size="lg"
        isLoading={isLoading || isFetching || isDownloading}
        isDisabled={!applications?.length}
        isFullWidth
        onClick={async () => {
          setIsDownloading(true)
          try {
            await handleDisponibilityDownload({
              //@ts-expect-error
              disponibility: applications[0]?.disponibility,
              onError: () => errorToast(t('error')),
              campaign: selectedCampaign,
            })
          } catch (err) {
            console.log(err)
            errorToast(t('error'))
          } finally {
            setIsDownloading(false)
          }
        }}
      >
        {t('place.download')}
      </Button>
    </Box>
  )
}

export default ApplicationDownloadAll

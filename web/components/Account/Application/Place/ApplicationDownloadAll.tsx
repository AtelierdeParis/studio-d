import { Button, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ApplicationDownloadButton from '~components/Account/Application/Place/ApplicationsPdf/ApplicationDownloadButton'
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
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [downloadedApplications, setDownloadedApplications] = useState([])

  return (
    <>
      <Button
        colorScheme={selectedCampaign?.mode === 'closed' ? 'gray' : 'blue'}
        backgroundColor={
          selectedCampaign?.mode === 'closed' ? 'gray.700' : undefined
        }
        color={selectedCampaign?.mode === 'closed' ? 'white' : undefined}
        size="lg"
        onClick={() => {
          setDownloadedApplications([])
          onOpen()
        }}
        isLoading={
          isLoading ||
          isFetching ||
          (isOpen && applications?.length !== downloadedApplications.length)
        }
      >
        {t('place.download')}
      </Button>
      {applications?.map((application) => (
        <ApplicationDownloadButton
          application={application}
          controlledOnClose={onClose}
          controlledIsOpen={isOpen}
          key={application?.id}
          onDownloadFinish={(id) => {
            setDownloadedApplications([...downloadedApplications, id])
          }}
        />
      ))}
    </>
  )
}

export default ApplicationDownloadAll

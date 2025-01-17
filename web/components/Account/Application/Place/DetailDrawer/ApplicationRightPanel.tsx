import { Button, Divider, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDownload from 'public/assets/img/applicationDownload.svg'
import ApplicationCountAlert from '~components/Account/Application/Place/DetailDrawer/ApplicationCountAlert'

import ApplicationDetailInfos from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailInfos'
import ApplicationPreselectButton from '~components/Account/Application/Place/DetailDrawer/ApplicationPreselectButton'
import { Application } from '~typings/api'

const ApplicationRightPanel = ({
  application,
  canPreselect,
  handleDownload,
  isDownloading,
}: {
  application: Application
  canPreselect: boolean
  handleDownload: () => void
  isDownloading?: boolean
}) => {
  const { t } = useTranslation('application')

  return (
    <VStack p={{ base: 0, md: 4 }} spacing={4}>
      <VStack maxW="100%" overflow="hidden" width="100%">
        <Button
          isFullWidth
          borderRadius={0}
          leftIcon={<ApplicationDownload />}
          display="flex"
          justifyContent={'flex-start'}
          p={3}
          backgroundColor="blue.100"
          color="blue.500"
          _hover={{
            backgroundColor: 'blue.200',
          }}
          _active={{
            backgroundColor: 'blue.300',
          }}
          height="auto!important"
          onClick={handleDownload}
          isLoading={isDownloading}
          loadingText={t('place.detail.downloading_pdf')}
        >
          <Text pl={1}>{t('place.detail.download_pdf')}</Text>
        </Button>
        <ApplicationPreselectButton
          application={application}
          canPreselect={canPreselect}
        />
      </VStack>
      <ApplicationCountAlert applicationId={application.id} />
      <Divider />
      {/* @ts-expect-error */}
      <ApplicationDetailInfos company={application?.company} />
    </VStack>
  )
}

export default ApplicationRightPanel

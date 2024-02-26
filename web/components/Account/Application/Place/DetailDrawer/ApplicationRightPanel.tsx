import { VStack, Divider, Button, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDownload from 'public/assets/img/applicationDownload.svg'
import ApplicationSelected from 'public/assets/img/applicationSelected.svg'
import ApplicationDetailInfos from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailInfos'
import { Application, Espace } from '~typings/api'

const ApplicationRightPanel = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('application')
  return (
    <VStack
      p={{ base: 0, md: 4 }}
      borderLeft={{ base: 'none', md: '1px solid lightgray' }}
      spacing={4}
    >
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
        >
          <Text pl={1}>{t('place.detail.download_pdf')}</Text>
        </Button>
        <Button
          isFullWidth
          borderRadius={0}
          leftIcon={<ApplicationSelected />}
          display="flex"
          justifyContent={'flex-start'}
          p={3}
          backgroundColor="rgba(110, 174, 127, 0.25)"
          color="black"
          _hover={{
            backgroundColor: 'rgba(110, 174, 127, 0.4)',
          }}
          _active={{
            backgroundColor: 'rgba(110, 174, 127, 0.6)',
          }}
          height="auto!important"
        >
          <Text pl={1}>{t('place.detail.preselect')}</Text>
        </Button>
      </VStack>

      <Divider />
      {/* @ts-expect-error */}
      <ApplicationDetailInfos company={application?.company} />
    </VStack>
  )
}

export default ApplicationRightPanel

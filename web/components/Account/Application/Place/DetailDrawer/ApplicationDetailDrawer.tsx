import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Divider,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDetailHeader from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailHeader'
import { Application } from '~typings/api'
import ApplicationRightPanel from '~components/Account/Application/Place/DetailDrawer/ApplicationRightPanel'
import SingleApplication from '~components/Account/Application/Place/SingleApplication'
import { downloadPdf } from '~components/Account/Application/Place/ApplicationsPdf/pdfUtils'
import { useRef, useState } from 'react'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const ApplicationDetailDrawer = ({
  isOpen,
  onClose,
  application,
  canPreselect,
}: {
  isOpen: boolean
  onClose: () => void
  application: Application
  canPreselect: boolean
}) => {
  const { t } = useTranslation('application')
  const { id } = application ?? {}
  const pdfRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const { selectedCampaign } = useSelectedCampaign()

  if (!application) {
    return null
  }
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent p={6} height="100%" maxW="80vw">
        <DrawerCloseButton />
        <DrawerHeader paddingY={0} paddingLeft={0}>
          {t('place.detail.title', { id })}
        </DrawerHeader>

        <VStack paddingY={4}>
          <ApplicationDetailHeader application={application} />
          <Divider />

          <Box paddingBottom={4}>
            <Grid templateColumns={'repeat(3, 1fr)'} gap={4} width="100%">
              <GridItem
                colSpan={{ base: 3, md: 2 }}
                overflowX="auto"
                maxHeight="90vh"
                overflowY="auto"
              >
                <SingleApplication application={application} ref={pdfRef} />
              </GridItem>

              <GridItem
                colSpan={{ base: 3, md: 1 }}
                borderLeft={{ base: 'none', md: '1px solid lightgray' }}
              >
                <ApplicationRightPanel
                  application={application}
                  canPreselect={canPreselect}
                  handleDownload={async () => {
                    setIsLoading(true)
                    await downloadPdf(
                      pdfRef.current,
                      `application_${id}_${application?.company?.structureName
                        ?.split(' ')
                        ?.join('_')}_${selectedCampaign?.title
                        ?.split(' ')
                        ?.join('_')}`,
                      application?.creation_file[0]?.url,
                    )
                    setIsLoading(false)
                  }}
                  isDownloading={isLoading}
                />
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplicationDetailDrawer

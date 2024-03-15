import {
  Box,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDetailHeader from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailHeader'
import ApplicationRightPanel from '~components/Account/Application/Place/DetailDrawer/ApplicationRightPanel'
import { Application } from '~typings/api'

import { useState } from 'react'

import ApplicationDetails from '~components/Account/Application/Place/DetailDrawer/ApplicationDetails'
import useToast from '~hooks/useToast'
import { handleApplicationDownload } from '~utils/pdf'

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
  const [isDownloading, setIsDownloading] = useState(false)
  const { errorToast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await handleApplicationDownload({
        application,
        onError: () => errorToast(t('error')),
      })
    } catch (err) {
      console.log(err)
      errorToast(t('error'))
    } finally {
      setIsDownloading(false)
    }
  }

  if (!application) {
    return null
  }

  const pdfUrl = application?.creation_file?.[0]?.url

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose()
      }}
      size="xl"
    >
      <DrawerOverlay />
      <DrawerContent p={6} height="100%" overflowY="auto">
        <DrawerCloseButton />
        <DrawerHeader paddingY={0} paddingLeft={0}>
          {t('place.detail.title', { id })}
        </DrawerHeader>
        <VStack paddingY={4} height="100%">
          <ApplicationDetailHeader application={application} />
          <Divider />
          <Box width="100%" height="100%" paddingBottom={'100px'}>
            <Grid templateColumns={'repeat(3, 1fr)'} width="100%" height="100%">
              <GridItem
                colSpan={{ base: 3, md: 2 }}
                overflowX="auto"
                overflowY="auto"
                display="flex"
                height="100%"
                width="100%"
                flexDirection="column"
              >
                <Box>
                  <ApplicationDetails application={application} />
                  <Divider opacity={0.4} />
                  {pdfUrl && (
                    <Box
                      as="object"
                      data={pdfUrl}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                    />
                  )}
                </Box>
              </GridItem>
              <GridItem
                colSpan={{ base: 3, md: 1 }}
                borderLeft={{ base: 'none', md: '1px solid lightgray' }}
              >
                <ApplicationRightPanel
                  application={application}
                  canPreselect={canPreselect}
                  handleDownload={handleDownload}
                  isDownloading={isDownloading}
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

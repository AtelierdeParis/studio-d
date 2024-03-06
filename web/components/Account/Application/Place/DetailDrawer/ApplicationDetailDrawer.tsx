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
  Text,
  Skeleton,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDetailHeader from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailHeader'
import { Application } from '~typings/api'
import ApplicationRightPanel from '~components/Account/Application/Place/DetailDrawer/ApplicationRightPanel'

import { useState } from 'react'
import { Document, Page } from 'react-pdf'

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
  const [scales, setScales] = useState([])
  const { errorToast } = useToast()
  const [numPages, setNumPages] = useState(0)

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

          <Box paddingBottom={4} width="100%">
            <Grid templateColumns={'repeat(3, 1fr)'} gap={4} width="100%">
              <GridItem
                colSpan={{ base: 3, md: 2 }}
                overflowX="auto"
                maxHeight="90vh"
                overflowY="auto"
              >
                <Box overflowX="auto">
                  <Document
                    file={`/api/pdfs/single/${application.id}`}
                    onLoadSuccess={({ numPages }) => {
                      setNumPages(numPages)
                    }}
                    loading={
                      <Skeleton
                        height="100vh"
                        width="100vw"
                        variant="rectangle"
                      />
                    }
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        onRenderSuccess={(page) => {
                          const viewport = page.getViewport({ scale: 1 })
                          if (viewport) {
                            const orientation =
                              viewport.width > viewport.height
                                ? 'landscape'
                                : 'portrait'
                            // Adjust the scale based on the orientation
                            const scale =
                              orientation === 'landscape' ? 0.7 : 1.0
                            setScales((prevScales) => {
                              const newScales = [...prevScales]
                              newScales[index] = scale
                              return newScales
                            })
                          }
                        }}
                        scale={scales[index] || 1.0}
                      />
                    ))}
                  </Document>
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

import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Divider,
  Stack,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationDetailHeader from '~components/Account/Application/Place/DetailDrawer/ApplicationDetailHeader'
import { Application } from '~typings/api'
import ApplicationRightPanel from '~components/Account/Application/Place/DetailDrawer/ApplicationRightPanel'
import ApplicationPdf from '~components/Account/Application/Place/DetailDrawer/ApplicationPdf'

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

          <Grid templateColumns={'repeat(3, 1fr)'} gap={4} width="100%">
            <GridItem colSpan={{ base: 3, md: 2 }}>
              <ApplicationPdf />
            </GridItem>

            <GridItem colSpan={{ base: 3, md: 1 }}>
              <ApplicationRightPanel
                application={application}
                canPreselect={canPreselect}
              />
            </GridItem>
          </Grid>
        </VStack>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplicationDetailDrawer

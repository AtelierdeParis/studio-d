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
import ApplicationEditRightPanel from '~components/Account/Application/Company/ApplicationEditRightPanel'
import { FormProvider, useForm } from 'react-hook-form'
import {
  getApplicationDefaultValues,
  getApplicationFormData,
  getApplicationSchema,
} from '~components/Campaign/Places/Application/ApplicationForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '~hooks/useCurrentUser'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import useToast from '~hooks/useToast'
import ApplicationReferences from '~components/Campaign/Places/Application/References/ApplicationReferences'
import ApplicationGeneral from '~components/Campaign/Places/Application/ApplicationGeneral'
import ApplicationCreation from '~components/Campaign/Places/Application/ApplicationCreation'
import { client } from '~api/client-api'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

const ApplicationEditDrawer = ({
  isOpen,
  onClose,
  application,
  handleDelete,
}: {
  isOpen: boolean
  onClose: () => void
  application: Application
  handleDelete: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('application')
  const { t: tPlace } = useTranslation('place')
  const schema = getApplicationSchema(tPlace, true)

  const form = useForm({
    resolver: yupResolver(schema),
  })

  const { handleSubmit, reset } = form
  const { id } = application ?? {}
  const { data: user } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()
  const { successToast, errorToast } = useToast()
  const queryClient = useQueryClient()
  const { query } = useRouter()

  useEffect(() => {
    const defaultValues = getApplicationDefaultValues(application)
    reset(defaultValues)
  }, [application, reset])

  const onSubmit = async (formValues) => {
    setIsLoading(true)

    const applicationFileId = application?.creation_file?.[0]?.id
    const formFileId = formValues?.creation_file?.[0]?.id

    const fileHasChanged =
      (applicationFileId && !formFileId) || formFileId !== applicationFileId
    const removedFileId =
      fileHasChanged && applicationFileId ? applicationFileId : undefined

    // If file has changed and is not used by other applications delete old file from server
    if (fileHasChanged) {
      const { data } = await client.upload.filesDetail(removedFileId)
      const isUsedByOtherApplications = data?.related?.length > 1
      if (!isUsedByOtherApplications) {
        await client.upload.filesDelete(removedFileId)
      }
    }

    try {
      const formData = getApplicationFormData({
        formValues,
        user,
        currentCampaign,
        place: application.disponibility?.espace,
        disponibilityId: application.disponibility.id,
      })
      console.log(formData.entries, formValues)

      //@ts-expect-error
      await client.applications.applicationsUpdate(application.id, formData)
      reset(getApplicationDefaultValues(formValues))
      successToast(t('company.detail.saved'))
      queryClient.refetchQueries([
        'myApplications',
        query?.disponibility as string,
      ])
      onClose()
    } catch (e) {
      console.log(e)
      errorToast(t('company.detail.error_saved'))
    }
    setIsLoading(false)
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

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack paddingY={4}>
              <ApplicationDetailHeader application={application} isCompany />
              <Divider />

              <Box paddingBottom={4} width="100%">
                <Grid templateColumns={'repeat(3, 1fr)'} gap={4} width="100%">
                  <GridItem
                    colSpan={{ base: 3, md: 2 }}
                    overflowX="auto"
                    maxHeight="90vh"
                    overflowY="auto"
                    paddingBottom={40}
                  >
                    <VStack spacing={12} paddingY={4}>
                      <ApplicationReferences />
                      <ApplicationGeneral
                        //   @ts-expect-error
                        place={application?.disponibility?.espace}
                      />
                      <ApplicationCreation />
                    </VStack>
                  </GridItem>

                  <GridItem
                    colSpan={{ base: 3, md: 1 }}
                    borderLeft={{ base: 'none', md: '1px solid lightgray' }}
                  >
                    <ApplicationEditRightPanel
                      application={application}
                      handleBack={onClose}
                      handleDelete={handleDelete}
                      isLoading={isLoading}
                      handleSubmit={handleSubmit(onSubmit)}
                    />
                  </GridItem>
                </Grid>
              </Box>
            </VStack>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplicationEditDrawer

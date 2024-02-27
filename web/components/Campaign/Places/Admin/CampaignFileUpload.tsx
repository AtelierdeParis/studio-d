import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputFile from '~components/InputFile'
import useToast from '~hooks/useToast'
import { Espace } from '~typings/api'
import Check from 'public/assets/img/check.svg'
import { client } from '~api/client-api'
import { addFilesWithInfo } from '~utils/file'

const CampaignFileUpload = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')
  const [isLoading, setLoading] = useState(false)
  const { errorToast, successToast } = useToast()

  const submitForm = async (values) => {
    setLoading(true)
    let createdFiles = null
    if (values.removedCampaign_files.length > 0) {
      await Promise.all(
        values.removedCampaign_files.map(client.upload.filesDelete),
      )
    }

    const newFiles = values?.campaign_files?.filter((file) => !file.id)
    if (newFiles.length > 0) {
      createdFiles = await Promise.all(
        addFilesWithInfo(newFiles, {
          ref: 'espace',
          refId: place.id.toString(),
          field: 'campaign_files',
        }),
      )
    }

    try {
      await client.espaces.espacesUpdate(place.id, {
        ...values,
        files: values.campaign_files.filter((file) => file.id),
      })
      successToast(t('campaignSchedule.files_success'))
    } catch (e) {
      errorToast(t('campaignSchedule.files_error'))
    }
    setLoading(false)
  }

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  })

  const { handleSubmit, control, reset, formState } = methods

  return (
    <FormProvider {...methods}>
      <VStack paddingY={6} spacing={4} width="100%" alignItems="stretch">
        <Text textStyle="h2" fontWeight="200">
          {t('campaignSchedule.title')}
        </Text>
        <form onSubmit={handleSubmit(submitForm)}>
          <InputFile
            control={control}
            place={place}
            name="Campaign_files"
            label={
              <Text fontWeight="200" color="gray.400">
                {t('campaignSchedule.helper')}
              </Text>
            }
          />
          {Object.keys(formState.dirtyFields).length > 0 && (
            <HStack alignItems="center" paddingY={4}>
              <Button
                variant="unstyled"
                color="gray.400"
                _hover={{ color: 'gray.500' }}
                onClick={() => reset()}
              >
                {t('cancel')}
              </Button>
              <Button
                ml={3}
                size="lg"
                leftIcon={<Check />}
                isLoading={isLoading}
                type="submit"
                isDisabled={Object.keys(formState.dirtyFields).length === 0}
              >
                {t('save')}
              </Button>
            </HStack>
          )}
        </form>
      </VStack>
    </FormProvider>
  )
}

export default CampaignFileUpload

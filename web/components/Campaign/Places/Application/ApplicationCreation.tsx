import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import FileField from '~components/Campaign/Places/Application/Inputs/FileField'
import TextAreaField from '~components/Campaign/Places/Application/Inputs/TextAreaField'
import TextField from '~components/Campaign/Places/Application/Inputs/TextField'

const ApplicationCreation = () => {
  const { t } = useTranslation('place')
  return (
    <VStack width="100%" alignItems="stretch" spacing={8}>
      <ApplicationFormTitle
        title={t('campaignApplication.creation.title')}
        position="3."
      />

      <TextField
        name="creation_title"
        label={t('campaignApplication.creation.field_title')}
      />

      <TextField
        name="creation_dancers"
        min={0}
        label={t('campaignApplication.creation.dancers')}
        type={'number'}
      />

      <FileField
        name="creation_file"
        label={t('campaignApplication.creation.file')}
        helper={t('campaignApplication.creation.file_helper')}
        acceptableTypes={['application/pdf']}
        maxSize={5}
      />

      <TextAreaField
        name="creation_summary"
        label={t('campaignApplication.creation.summary')}
        helper={t('campaignApplication.creation.summary_helper')}
        minHeight={180}
      />

      <TextAreaField
        name="creation_partnerships"
        label={t('campaignApplication.creation.partnerships')}
        helper={t('campaignApplication.creation.partnerships_helper')}
        minHeight={180}
      />

      <TextAreaField
        name="creation_techical_requirements"
        label={t('campaignApplication.creation.technical')}
        minHeight={180}
      />
    </VStack>
  )
}

export default ApplicationCreation

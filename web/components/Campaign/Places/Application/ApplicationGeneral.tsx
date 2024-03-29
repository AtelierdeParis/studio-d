import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import BooleanField from '~components/Campaign/Places/Application/Inputs/BooleanField'
import TextAreaField from '~components/Campaign/Places/Application/Inputs/TextAreaField'
import { Espace } from '~typings/api'

const ApplicationGeneral = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')
  return (
    <VStack width="100%" alignItems="stretch" spacing={6}>
      <ApplicationFormTitle
        title={t('campaignApplication.general.title')}
        position="2."
      />

      <BooleanField
        label={t('campaignApplication.general.subtitle', {
          place: place.users_permissions_user.structureName,
        })}
        name="already_supported"
      />

      <TextAreaField
        name="cv"
        label={t('campaignApplication.general.bio')}
        helper={t('campaignApplication.general.bioHelper')}
        maxLength={3000}
        minHeight={180}
      />
    </VStack>
  )
}

export default ApplicationGeneral

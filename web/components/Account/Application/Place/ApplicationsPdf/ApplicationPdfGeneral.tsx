import { Text, Heading, VStack, Divider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import { Application } from '~typings/api'

const ApplicationPdfGeneral = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('place')
  return (
    <VStack alignItems="flex-start">
      <ApplicationFormTitle
        title={t('campaignApplication.general.title')}
        position="2."
        spacing={6}
      />

      <VStack width="100%" spacing={4}>
        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.general.subtitle', {
              place:
                // @ts-expect-error
                application?.disponibility?.espace?.users_permissions_user
                  .structureName,
            })}
          </Text>
          <Text>
            {application?.already_supported ? t('global.yes') : t('global.no')}
          </Text>
        </VStack>

        <Divider opacity={0.3} />

        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.general.bio')}
          </Text>
          <Text>{application?.cv}</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default ApplicationPdfGeneral

import { Text, Heading, VStack, Divider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import { Application } from '~typings/api'

const ApplicationPdfCreation = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('place')
  return (
    <VStack alignItems="flex-start">
      <ApplicationFormTitle
        title={t('campaignApplication.creation.title')}
        position="3."
        spacing={6}
      />

      <VStack width="100%" spacing={4}>
        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.creation.field_title')}
          </Text>
          <Text>{application?.creation_title}</Text>
        </VStack>

        <Divider opacity={0.3} />

        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.creation.dancers')}
          </Text>
          <Text>{application?.creation_dancers}</Text>
        </VStack>

        <Divider opacity={0.3} />

        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.creation.summary')}
          </Text>
          <Text>{application?.creation_summary}</Text>
        </VStack>

        <Divider opacity={0.3} />

        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.creation.partnerships')}
          </Text>
          <Text>{application?.creation_partnerships}</Text>
        </VStack>

        <Divider opacity={0.3} />

        <VStack width="100%" alignItems="flex-start">
          <Text fontFamily="mabry medium">
            {t('campaignApplication.creation.technical')}
          </Text>
          <Text>{application?.creation_techical_requirements}</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default ApplicationPdfCreation

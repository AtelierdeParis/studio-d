import { VStack, Divider, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import ReferenceItem from '~components/Campaign/Places/Application/References/ReferenceItem'
import { Application } from '~typings/api'
import { Reference } from '~@types/reference'

const ApplicationPdfReferences = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('place')
  const references = application?.references as Reference[]
  return (
    <VStack alignItems="flex-start" width={'100%'}>
      <ApplicationFormTitle
        title={t('campaignApplication.references.title')}
        position="1."
        spacing={6}
      />
      <VStack width="100%">
        {references?.map((reference, key) => (
          <Box key={key} width="100%">
            <ReferenceItem reference={reference} index={key} />
            {key < references?.length - 1 && <Divider opacity="0.3" />}
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}

export default ApplicationPdfReferences

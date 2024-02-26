import { Box, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Application } from '~typings/api'
import { format } from '~utils/date'

const ApplicationDetailHeader = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('application')

  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} width="100%">
      <VStack
        borderBottom={{ base: '1px solid lightgray', sm: 'none' }}
        alignItems="flex-start"
        p={2}
      >
        <Text fontWeight="bold">{t('place.detail.header.slot')}</Text>
        <Text>{`${format(
          application?.disponibility?.start,
          'dd MMMM',
        )} - ${format(application?.disponibility?.end, 'dd MMMM yyyy')}`}</Text>
      </VStack>

      <VStack
        borderLeft={{ base: 'none', sm: '1px solid lightgray' }}
        borderBottom={{ base: '1px solid lightgray', sm: 'none' }}
        alignItems="flex-start"
        p={2}
      >
        <Text fontWeight="bold"> {t('place.detail.header.space')}</Text>
        {/* @ts-expect-error */}
        <Text>{application?.disponibility?.espace?.name}</Text>
      </VStack>

      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        p={2}
        borderLeft={{ base: 'none', sm: '1px solid lightgray' }}
      >
        <Text fontWeight="bold">{t('place.detail.header.company')}</Text>
        <Text>{application?.company?.structureName}</Text>
      </VStack>
    </SimpleGrid>
  )
}

export default ApplicationDetailHeader

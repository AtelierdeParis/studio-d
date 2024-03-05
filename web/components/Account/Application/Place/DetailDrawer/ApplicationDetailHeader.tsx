import { Box, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Application } from '~typings/api'
import { format } from '~utils/date'

const ApplicationDetailHeader = ({
  application,
  isCompany,
}: {
  application: Application
  isCompany?: boolean
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
        borderLeft={{ base: 'none', sm: '1px solid lightgray' }}
        alignItems="flex-start"
        p={2}
      >
        {isCompany ? (
          <>
            <Text fontWeight="bold">{t('place.detail.header.place')}</Text>
            <Text>
              {
                // @ts-expect-error
                application?.disponibility?.espace?.users_permissions_user
                  ?.structureName
              }
            </Text>
          </>
        ) : (
          <>
            <Text fontWeight="bold">{t('place.detail.header.company')}</Text>
            <Text>{application?.company?.structureName}</Text>
          </>
        )}
      </VStack>
    </SimpleGrid>
  )
}

export default ApplicationDetailHeader

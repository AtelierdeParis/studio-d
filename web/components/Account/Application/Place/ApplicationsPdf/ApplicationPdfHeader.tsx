import { Box, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { Application } from '~typings/api'
import { format } from '~utils/date'

const ApplicationPdfHeader = ({
  application,
}: {
  application: Application
}) => {
  const { t } = useTranslation('application')
  return (
    <SimpleGrid columns={3} fontFamily="mabry medium">
      <VStack alignItems="flex-start" spacing={6}>
        <Box backgroundColor="blue.500" borderRadius="4px" color="white">
          <Text paddingX={2} paddingY={2}>
            {t('place.detail.title', { id: application?.id })}
          </Text>
        </Box>

        <VStack width="100%" alignItems="flex-start">
          <Heading textStyle="h2">
            {/* @ts-expect-error */}
            {application?.disponibility?.espace?.name}
          </Heading>
          <Heading textStyle="h3">
            {`${format(application?.disponibility?.start, 'dd/MM')} → ${format(
              application?.disponibility?.end,
              'dd/MM',
            )}`}
          </Heading>
        </VStack>
      </VStack>

      <VStack alignItems="flex-start" spacing={6}>
        <Box>
          <Text>{application?.company?.structureName}</Text>
          <Text>{application?.company?.address}</Text>
          <Text>
            {application?.company?.zipCode} {application?.company?.city}
          </Text>
        </Box>

        <Box>
          <Box>
            <Text as="span">{t('place.detail.right_panel.phone')}</Text>
            <Text as="span" pl={1}>
              {application?.company?.phone}
            </Text>
          </Box>
          <Box>
            <Text as="span">{t('place.detail.right_panel.email')}</Text>
            <Text as="span" pl={1}>
              {application?.company?.email}
            </Text>
          </Box>

          {application?.company?.website && (
            <Text
              as={Link}
              href={application?.company?.website}
              target="_blank"
              color="gray.300"
              fontWeight={'500'}
              textDecoration="underline"
            >
              {application?.company?.website}
            </Text>
          )}
        </Box>
      </VStack>

      <VStack alignItems="flex-start">
        <Box>
          <Text as="span">{t('place.detail.right_panel.siret')}</Text>
          <Text as="span" pl={1}>
            {application?.company?.siret}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.ape')}</Text>
          <Text pl={1} as="span">
            {application?.company?.ape}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.insurance_name')}</Text>
          <Text pl={1} as="span">
            {application?.company?.insuranceName}
          </Text>
        </Box>

        <Box>
          <Text as="span">
            {t('place.detail.right_panel.insurance_number')}
          </Text>
          <Text pl={1} as="span">
            {application?.company?.insuranceNumber}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.license')}</Text>
          <Text pl={1} as="span">
            {application?.company?.license}
          </Text>
        </Box>
      </VStack>
    </SimpleGrid>
  )
}

export default ApplicationPdfHeader

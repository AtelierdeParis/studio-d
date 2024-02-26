import { VStack, Text, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { UsersPermissionsUser } from '~typings/api'

const ApplicationDetailInfos = ({
  company,
}: {
  company: UsersPermissionsUser
}) => {
  const { t } = useTranslation('application')
  const {
    structureName,
    address,
    phone,
    email,
    website,
    siret,
    insuranceName,
    ape,
    insuranceNumber,
    license,
  } = company ?? {}

  return (
    <VStack alignItems="stretch" fontWeight="600" spacing={4} width="100%">
      <Box>
        <Text>{structureName}</Text>
        <Text>{address}</Text>
      </Box>

      <Box>
        <Box>
          <Text as="span">{t('place.detail.right_panel.phone')}</Text>
          <Text as="span" pl={1}>
            {phone}
          </Text>
        </Box>
        <Box>
          <Text as="span">{t('place.detail.right_panel.email')}</Text>
          <Text as="span" pl={1}>
            {email}
          </Text>
        </Box>

        {website && (
          <Text
            as={Link}
            href={website}
            target="_blank"
            color="gray.300"
            fontWeight={'500'}
            textDecoration="underline"
          >
            {website}
          </Text>
        )}
      </Box>

      <Box>
        <Box>
          <Text as="span">{t('place.detail.right_panel.siret')}</Text>
          <Text as="span" pl={1}>
            {siret}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.ape')}</Text>
          <Text pl={1} as="span">
            {ape}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.insurance_name')}</Text>
          <Text pl={1} as="span">
            {insuranceName}
          </Text>
        </Box>

        <Box>
          <Text as="span">
            {t('place.detail.right_panel.insurance_number')}
          </Text>
          <Text pl={1} as="span">
            {insuranceNumber}
          </Text>
        </Box>

        <Box>
          <Text as="span">{t('place.detail.right_panel.license')}</Text>
          <Text pl={1} as="span">
            {license}
          </Text>
        </Box>
      </Box>
    </VStack>
  )
}

export default ApplicationDetailInfos

import { Box, HStack, Text } from '@chakra-ui/react'
import PreselectionsValidated from 'public/assets/img/preselectionsValidated.svg'
import { useTranslation } from 'next-i18next'

const ClosedCampaign = () => {
  const { t } = useTranslation('application')

  return (
    <Box paddingY={2}>
      <HStack backgroundColor="gray.50" borderRadius="4px" p={4}>
        <PreselectionsValidated />
        <Text as="span" color="gray.700" pl={1}>
          {t('place.helper.closed_campaign')}
        </Text>
      </HStack>
    </Box>
  )
}

export default ClosedCampaign

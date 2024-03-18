import { Box, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const ClosedApplications = () => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('application')

  return (
    <Box paddingY={6}>
      <Stack
        backgroundColor="grayBackground"
        direction={{ base: 'column', md: 'row' }}
        p={2}
        borderRadius="4px"
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'center' }}
        spacing={2}
      >
        <Box>
          <Text as="span" fontWeight="bold">
            {t(`company.helper.closed_start`, {
              title: currentCampaign?.title,
            })}
          </Text>
          <Text as="span" pl={1}>
            {t('company.helper.closed_end', {
              date: format(currentCampaign.preselection_end),
            })}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default ClosedApplications

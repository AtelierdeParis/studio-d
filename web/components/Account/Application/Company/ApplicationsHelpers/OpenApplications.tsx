import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { ROUTE_PLACES } from '~constants'
import { format } from '~utils/date'
import Link from '~components/Link'

const OpenApplications = ({
  remainingApplications,
}: {
  remainingApplications: number
}) => {
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
          <Text as="span">
            {t(`company.helper.start${remainingApplications > 1 ? 's' : ''}`, {
              num: remainingApplications,
            })}
          </Text>
          <Text as="span" fontWeight="bold">
            {t('company.helper.end', {
              date: format(currentCampaign.application_end),
            })}
          </Text>
        </Box>
        <Button
          as={Link}
          href={ROUTE_PLACES + '?tab=1'}
          colorScheme="blue"
          size="lg"
          whiteSpace={'break-spaces'}
          textAlign="center"
          p={4}
          height="auto"
        >
          {t('company.helper.cta')}
        </Button>
      </Stack>
    </Box>
  )
}

export default OpenApplications

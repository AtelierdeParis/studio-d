import { VStack, Text, Box, Button, Stack } from '@chakra-ui/react'
import Hands from 'public/assets/img/hands-outline.svg'
import theme from '~theme'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACES, ROUTE_PLACES } from '~constants'
import { CampaignMode } from '~components/Campaign/CampaignContext'
import Tag from '~components/Tag'
import Link from '~components/Link'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const HomeCampaignInsert = () => {
  const { currentCampaign } = useCampaignContext()
  const { title, mode, limitDate } = currentCampaign || {}
  const { t } = useTranslation('home')

  return (
    <Box
      bg="white"
      borderRadius={{ base: 'none', lg: 'lg' }}
      p={4}
      paddingBottom={{ base: 8, md: 2 }}
      height="100%"
    >
      <VStack alignItems="flex-start" spacing={4}>
        <Tag status="campaign">{title}</Tag>
        <Stack
          paddingLeft={4}
          alignItems="flex-start"
          width="100%"
          direction={{ base: 'column', md: 'row' }}
        >
          <Hands
            stroke={theme.colors.campaign['dark']}
            width="22px"
            height="22px"
          />
          <Box flex={1}>
            <Text fontWeight="bold">{t(`campaign.insert.${mode}.title`)}</Text>
            <Text>
              {t(`campaign.insert.${mode}.subtitle`, {
                date: format(new Date(limitDate), 'd MMMM'),
              })}
            </Text>
          </Box>
          <Box>
            <Button
              variant="campaign"
              as={Link}
              href={
                mode === 'applications'
                  ? `${ROUTE_PLACES}?tab=1`
                  : ROUTE_ACCOUNT_PLACES
              }
            >
              {t(`campaign.insert.${mode}.cta`)}
            </Button>
          </Box>
        </Stack>
      </VStack>
    </Box>
  )
}

export default HomeCampaignInsert
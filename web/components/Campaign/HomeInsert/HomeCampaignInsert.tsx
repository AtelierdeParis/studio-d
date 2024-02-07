import { VStack, Text, Box, Button, Stack } from '@chakra-ui/react'
import Hands from 'public/assets/img/hands-outline.svg'
import theme from '~theme'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACES, ROUTE_PLACES } from '~constants'
import { CampaignMode } from '~components/Campaign/CampaignContext'
import Tag from '~components/Tag'

const HomeCampaignInsert = ({
  mode,
  date,
  title,
}: {
  mode: CampaignMode
  date: string
  title: string
}) => {
  const { t } = useTranslation('home')

  // No display provided for preselections
  if (mode === 'preselections') return null

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
            <Text>{t(`campaign.insert.${mode}.subtitle`, { date })}</Text>
          </Box>
          <Box>
            <Button
              variant="campaign"
              href={
                mode === 'applications' ? ROUTE_PLACES : ROUTE_ACCOUNT_PLACES
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

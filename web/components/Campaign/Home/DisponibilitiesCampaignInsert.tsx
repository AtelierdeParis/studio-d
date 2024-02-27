import { VStack, Text, Box, Button, HStack, Stack } from '@chakra-ui/react'
import Hands from 'public/assets/img/hands-outline.svg'
import theme from '~theme'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACES } from '~constants'
import Tag from '~components/Tag'
import Link from '~components/Link'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const DisponibilitiesCampaingInsert = () => {
  const { currentCampaign } = useCampaignContext()
  const { title, limitDate } = currentCampaign || {}
  const { t } = useTranslation('home')

  return (
    <VStack
      bgColor="white"
      borderRadius={{ base: 'none', lg: 'lg' }}
      p={4}
      alignItems="flex-start"
      height={'100%'}
    >
      <Box>
        <Tag status="campaign">{title}</Tag>
      </Box>

      <Box width="100%">
        <Stack
          mx="auto"
          width="100%"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="flex-start"
        >
          <HStack w="100%" p={2} alignItems="flex-start">
            <Hands
              stroke={theme.colors.campaign['dark']}
              width="22px"
              height="22px"
            />
            <Box flex={1}>
              <Text fontWeight="bold">
                {t(`campaign.insert.disponibilities.title`)}
              </Text>
              <Text opacity={0.5}>
                {t(`campaign.insert.disponibilities.subtitle`, {
                  date: format(new Date(limitDate), 'd MMMM'),
                })}
              </Text>
            </Box>
          </HStack>

          <Box>
            <Button
              size="lg"
              alignSelf="center"
              variant="campaign"
              as={Link}
              href={ROUTE_ACCOUNT_PLACES}
            >
              {t(`campaign.insert.disponibilities.cta`)}
            </Button>
          </Box>
        </Stack>
      </Box>
    </VStack>
  )
}

export default DisponibilitiesCampaingInsert

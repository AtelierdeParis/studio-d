import { Box, Button, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Hands from 'public/assets/img/hands-outline.svg'
import ApplicationCounter from '~components/Campaign/ApplicationCounter'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import Tag from '~components/Tag'
import { ROUTE_PLACES } from '~constants'
import theme from '~theme'
import { format } from '~utils/date'

const ApplicationsCampaignInsert = () => {
  const { currentCampaign } = useCampaignContext()
  const { title, limitDate } = currentCampaign || {}
  const { t } = useTranslation('home')

  return (
    <VStack
      bgColor="white"
      borderRadius={{ base: 'none', lg: 'lg' }}
      p={4}
      as={motion.div}
      alignItems="flex-start"
      height={'100%'}
      initial={{ boxShadow: 'inset 0 0 0px 0px rgba(235, 164, 10, 0)' }}
      animate={{ boxShadow: 'inset 0 0 2px 4px rgba(235, 164, 10, 0.3)' }}
      transition="3s linear"
    >
      <Box>
        <Tag status="campaign">
          {t(`campaign.title`, { title: currentCampaign?.title })}
        </Tag>
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
                {t(`campaign.insert.applications.title`)}
              </Text>
              <Text opacity={0.5}>
                {t(`campaign.insert.applications.subtitle`, {
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
              href={`${ROUTE_PLACES}?tab=1`}
            >
              {t(`campaign.insert.applications.cta`)}
            </Button>
          </Box>
        </Stack>
        <Box paddingLeft={{ base: 0, md: 10 }} paddingTop={{ base: 4, md: 0 }}>
          <ApplicationCounter
            isFullButton
            borderTop="1px solid"
            borderColor={'gray.100'}
          />
        </Box>
      </Box>
    </VStack>
  )
}

export default ApplicationsCampaignInsert

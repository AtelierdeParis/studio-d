import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box, Stack } from '@chakra-ui/react'
import HomeSearch from '~components/Home/HomeSearch'
import ApplicationsCampaignInsert from '~components/Campaign/Home/ApplicationsCampaignInsert'
import DisponibilitiesCampaingInsert from '~components/Campaign/Home/DisponibilitiesCampaignInsert'

const HomeActions = () => {
  const {
    hasActiveCampaign,
    currentCampaign,
    isCampaignPlace,
  } = useCampaignContext()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: 0, lg: 4 }}
      maxW={hasActiveCampaign ? '1200px' : '750px'}
      pos={{ base: 'static', lg: 'relative' }}
      zIndex={99}
      paddingX={{ base: 0, lg: 8 }}
      width="100%"
    >
      <Box flex={hasActiveCampaign ? 3 : 1}>
        <HomeSearch hasActiveCampaign={hasActiveCampaign} />
      </Box>
      {hasActiveCampaign && (
        <Box
          flex={2}
          borderTop={{ base: '1px solid rgba(211, 211, 211, 0.5)', lg: 'none' }}
        >
          {currentCampaign?.mode === 'applications' && (
            <ApplicationsCampaignInsert />
          )}
          {currentCampaign?.mode === 'disponibilities' && isCampaignPlace && (
            <DisponibilitiesCampaingInsert />
          )}
        </Box>
      )}
    </Stack>
  )
}
export default HomeActions

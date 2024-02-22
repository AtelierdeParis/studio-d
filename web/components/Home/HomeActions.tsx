import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box, Stack } from '@chakra-ui/react'
import HomeSearch from '~components/Home/HomeSearch'
import HomeCampaignInsert from '~components/Campaign/Home/HomeCampaignInsert'

const HomeActions = () => {
  const { hasActiveCampaign } = useCampaignContext()

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
          id="licorne"
          borderTop={{ base: '1px solid rgba(211, 211, 211, 0.5)', lg: 'none' }}
        >
          <HomeCampaignInsert />
        </Box>
      )}
    </Stack>
  )
}
export default HomeActions

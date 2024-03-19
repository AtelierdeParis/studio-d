import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box, Stack } from '@chakra-ui/react'
import HomeSearch from '~components/Home/HomeSearch'
import ApplicationsCampaignInsert from '~components/Campaign/Home/ApplicationsCampaignInsert'
import DisponibilitiesCampaingInsert from '~components/Campaign/Home/DisponibilitiesCampaignInsert'
import { motion } from 'framer-motion'

const HomeCampaignActions = () => {
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
          id="licorne"
          flex={2}
          borderTop={{
            base: '1px solid rgba(211, 211, 211, 0.5)',
            lg: 'none',
          }}
          borderRadius={{ base: 'none', lg: 'lg' }}
        >
          <motion.div
            initial={{ boxShadow: 'inset 0 0 0 0 rgba(0, 0, 0, 0.5)' }}
            animate={{ boxShadow: 'inset 0 0 10px 2px rgba(0, 0, 0, 0.5)' }}
            transition={{ duration: 1, ease: 'easeIn' }}
          >
            {currentCampaign?.mode === 'applications' && (
              <ApplicationsCampaignInsert />
            )}
            {currentCampaign?.mode === 'disponibilities' && isCampaignPlace && (
              <DisponibilitiesCampaingInsert />
            )}
          </motion.div>
        </Box>
      )}
    </Stack>
  )
}
export default HomeCampaignActions

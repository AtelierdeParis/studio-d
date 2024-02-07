import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Box, Stack } from '@chakra-ui/react'
import HomeSearch from '~components/Home/HomeSearch'
import HomeCampaignInsert from '~components/Campaign/HomeInsert/HomeCampaignInsert'
import { useRouter } from 'next/router'
import { format } from '~utils/date'

const HomeActions = () => {
  const router = useRouter()
  const { currentCampaign } = useCampaignContext()
  const { mode, limitDate, title } = currentCampaign ?? {}
  const hasActiveCampaign = Boolean(mode && limitDate)

  return (
    <Stack
      width="100%"
      pos={'relative'}
      zIndex={99}
      direction={{ base: 'column', lg: 'row' }}
      transform={{ base: 'none', md: 'translateY(50%)' }}
      spacing={{ base: 0, lg: 4 }}
      maxW={hasActiveCampaign ? '1200px' : '750px'}
      pb={hasActiveCampaign ? { base: 0, md: 30, lg: 8 } : { base: 0, md: 4 }}
      paddingX={{ base: 0, lg: 4 }}
    >
      <Box flex={hasActiveCampaign ? 3 : 1}>
        <HomeSearch hasActiveCampaign={hasActiveCampaign} />
      </Box>
      {hasActiveCampaign && (
        <Box flex={2}>
          <HomeCampaignInsert
            mode={mode}
            date={format(new Date(limitDate), 'd MMMM')}
            title={title}
          />
        </Box>
      )}
    </Stack>
  )
}
export default HomeActions

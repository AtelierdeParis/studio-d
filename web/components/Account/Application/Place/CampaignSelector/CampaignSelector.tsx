import { HStack, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import CampaignSelectorField from '~components/Account/Application/Place/CampaignSelector/CampaignSelectorField'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { ROUTE_ACCOUNT_APPLICATIONS } from '~constants'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const CampaignSelector = ({ children }) => {
  const router = useRouter()
  const { campaign } = router.query
  const { allPlaceCampaigns } = useCampaignContext()
  const { t } = useTranslation('application')

  // If no campaign defined in url select last one
  useEffect(() => {
    if (!campaign && allPlaceCampaigns) {
      router.push(
        `${ROUTE_ACCOUNT_APPLICATIONS}?campaign=${allPlaceCampaigns?.[0]?.id}`,
      )
    }
  }, [allPlaceCampaigns])

  const { selectedCampaign } = useSelectedCampaign()

  if (!selectedCampaign) return null

  return (
    <>
      <Stack
        pt={{ base: 4, md: 8 }}
        pb={4}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Text
          textStyle="accountTitle"
          pl={4}
          fontSize="24px"
          fontWeight="400"
          fontFamily="mabry"
        >
          {t('place.title')}
        </Text>
        <CampaignSelectorField />
      </Stack>
      {selectedCampaign && children}
    </>
  )
}

export default CampaignSelector

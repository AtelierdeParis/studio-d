import { useRouter } from 'next/router'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const useSelectedCampaign = () => {
  const { allPlaceCampaigns } = useCampaignContext()
  const { query } = useRouter()
  const selectedCampaign = allPlaceCampaigns?.find(
    (c) => c?.id?.toString() === query?.campaign?.toString(),
  )

  return { selectedCampaign }
}

export default useSelectedCampaign

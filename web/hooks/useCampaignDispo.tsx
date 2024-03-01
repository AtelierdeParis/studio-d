import { useMemo } from 'react'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Disponibility } from '~typings/api'

const useCampaignDispo = (disponibilities?: Disponibility[]) => {
  const { currentCampaign } = useCampaignContext()

  const campaignDispos = useMemo(
    () =>
      disponibilities?.filter(
        (d) =>
          currentCampaign &&
          d?.campaign?.toString() === currentCampaign?.id?.toString(),
      ),
    [disponibilities, currentCampaign],
  )

  const solidarityDispos = useMemo(
    () => disponibilities?.filter((d) => !d?.campaign),
    [disponibilities, currentCampaign],
  )

  return {
    campaignDispos,
    campaignDisposNum: campaignDispos?.length || 0,
    solidarityDispos,
    solidarityDisposNum: solidarityDispos?.length || 0,
  }
}

export default useCampaignDispo

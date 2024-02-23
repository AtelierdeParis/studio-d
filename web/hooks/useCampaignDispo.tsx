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

  return {
    campaignDispos,
    campaignDisposNum: campaignDispos?.length,
  }
}

export default useCampaignDispo

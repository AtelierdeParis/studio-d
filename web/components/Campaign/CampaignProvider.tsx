import React, { useEffect, useMemo, useState } from 'react'
import CampaignContext from '~components/Campaign/CampaignContext'
import { useCampaigns } from '~hooks/useCampaigns'

interface ICampaignProvider {
  children: React.ReactNode
}

const CampaignProvider = ({ children }: ICampaignProvider) => {
  const today = new Date()
  const [activeCampaigns, setactiveCampaigns] = useState(null)

  const activeCampaignsQueryParameters = useMemo(
    () => ({
      disponibility_start_lte: today.toISOString(),
      preselection_end_gte: today.toISOString(),
    }),
    [],
  )
  const { data: campaigns, isLoading } = useCampaigns(
    activeCampaignsQueryParameters,
  )

  useEffect(() => {
    if (Boolean(campaigns?.length)) {
      const activeCampaigns = campaigns?.map((campaign) => {
        //const mode = getCampaignMode(campaign)
        const mode = 'applications'
        const limitDate = getLimitDate(campaign, mode)
        return { ...campaign, mode, limitDate }
      })

      setactiveCampaigns(activeCampaigns)
    }
  }, [campaigns])

  const getCampaignMode = (campaign) => {
    if (
      today >= new Date(campaign.disponibility_start) &&
      today <= new Date(campaign.disponibility_end)
    ) {
      return 'disponibilities'
    } else if (
      today >= new Date(campaign.application_start) &&
      today <= new Date(campaign.application_end)
    ) {
      return 'applications'
    } else if (
      today >= new Date(campaign.preselection_start) &&
      today <= new Date(campaign.preselection_end)
    ) {
      return 'preselections'
    }
    return null
  }

  const getLimitDate = (campaign, mode) => {
    switch (mode) {
      case 'applications':
        return campaign['application_end']

      case 'disponibilities':
        return campaign['disponibility_end']

      case 'preselections':
        return campaign['preselection_end']

      default:
        break
    }
  }

  return (
    <CampaignContext.Provider
      value={{
        activeCampaigns,
        currentCampaign: activeCampaigns?.[0],
        isLoading,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export default CampaignProvider

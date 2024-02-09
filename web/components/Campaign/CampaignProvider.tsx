import React, { useEffect, useMemo, useState } from 'react'
import CampaignContext from '~components/Campaign/CampaignContext'
import { useCampaigns } from '~hooks/useCampaigns'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface ICampaignProvider {
  children: React.ReactNode
}

const CampaignProvider = ({ children }: ICampaignProvider) => {
  const today = new Date()
  const { data: user } = useCurrentUser()
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
        const mode = getCampaignMode(campaign)
        const limitDate = getLimitDate(campaign, mode)
        return { ...campaign, mode, limitDate }
      })

      setactiveCampaigns(activeCampaigns)
    }
  }, [campaigns, user])

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

  const currentCampaign = activeCampaigns?.[0]
  const isCampaignPlace =
    user?.type === 'place' &&
    currentCampaign?.users_permissions_users.find((el) => el.id === user?.id)
  const hasActiveCampaign =
    (currentCampaign?.mode === 'disponibilities' && isCampaignPlace) ||
    currentCampaign?.mode === 'applications'

  return (
    <CampaignContext.Provider
      value={{
        activeCampaigns,
        currentCampaign,
        isCampaignPlace,
        hasActiveCampaign,
        isLoading,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export default CampaignProvider

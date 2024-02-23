import React, { useMemo } from 'react'
import CampaignContext, {
  CampaignMode,
} from '~components/Campaign/CampaignContext'
import { useCampaigns } from '~hooks/useCampaigns'
import { useCurrentUser } from '~hooks/useCurrentUser'

interface ICampaignProvider {
  children: React.ReactNode
}

export const getStartDateTime = (date) => {
  const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(1)
  return newDate
}

export const getEndDateTime = (date) => {
  const newDate = new Date(date)
  newDate.setHours(23)
  newDate.setMinutes(59)
  return newDate
}

const CampaignProvider = ({ children }: ICampaignProvider) => {
  const today = new Date()
  const { data: user } = useCurrentUser()

  const activeCampaignsQueryParameters = useMemo(
    () => ({
      disponibility_start_lte: today.toISOString(),
      preselection_end_gte: today.toISOString(),
      _sort: 'id:desc',
    }),
    [],
  )
  const { data: campaigns, isLoading } = useCampaigns(
    activeCampaignsQueryParameters,
  )

  const {
    data: campaignsAll,
    isLoading: isLoadingAllPlaceCampaigns,
  } = useCampaigns(
    {
      users_permissions_users: user?.id,
      _sort: 'id:desc',
    },
    {
      enabled: user?.type === 'place',
    },
  )

  const getCampaignMode = (campaign) => {
    if (
      today >= getStartDateTime(campaign.disponibility_start) &&
      today <= getEndDateTime(campaign.disponibility_end)
    ) {
      return 'disponibilities'
    } else if (
      today >= getStartDateTime(campaign.application_start) &&
      today <= getEndDateTime(campaign.application_end)
    ) {
      return 'applications'
    } else if (
      today >= getStartDateTime(campaign.preselection_start) &&
      today <= getEndDateTime(campaign.preselection_end)
    ) {
      return 'preselections'
    } else if (today >= getEndDateTime(campaign.preselection_end)) {
      return 'closed'
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

  const activeCampaigns = useMemo(
    () =>
      campaigns?.map((campaign) => {
        const mode = getCampaignMode(campaign) as CampaignMode
        const limitDate = getLimitDate(campaign, mode)
        return { ...campaign, mode, limitDate }
      }) || null,
    [campaigns],
  )

  const allPlaceCampaigns = useMemo(
    () =>
      campaignsAll?.map((campaign) => {
        const mode = getCampaignMode(campaign) as CampaignMode
        const limitDate = getLimitDate(campaign, mode)
        return { ...campaign, mode, limitDate }
      }) || null,
    [campaignsAll],
  )

  const currentCampaign = activeCampaigns?.[0]
  const isCampaignPlace =
    user?.type === 'place' &&
    Boolean(
      currentCampaign?.users_permissions_users.find((el) => el.id === user?.id),
    )
  const hasActiveCampaign =
    (currentCampaign?.mode === 'disponibilities' && isCampaignPlace) ||
    currentCampaign?.mode === 'applications'

  // console.log(
  //   activeCampaigns,
  //   currentCampaign,
  //   isCampaignPlace,
  //   hasActiveCampaign,
  //   isLoading,
  //   allPlaceCampaigns,
  //   isLoadingAllPlaceCampaigns,
  // )
  return (
    <CampaignContext.Provider
      value={{
        activeCampaigns,
        currentCampaign,
        isCampaignPlace,
        hasActiveCampaign,
        isLoading,
        allPlaceCampaigns,
        isLoadingAllPlaceCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export default CampaignProvider

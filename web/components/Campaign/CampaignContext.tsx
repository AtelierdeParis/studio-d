import React from 'react'
import { Campaign } from '~typings/api'

export type CampaignMode =
  | 'disponibilities'
  | 'applications'
  | 'preselections'
  | 'closed'
  | null

export type CampaignDetailed = Campaign & {
  mode: CampaignMode
  limitDate: string | null
}

interface ICampaignContext {
  activeCampaigns?: CampaignDetailed[]
  placeCampaigns?: CampaignDetailed[]
  currentCampaign?: CampaignDetailed
  isCampaignPlace?: boolean
  hasActiveCampaign?: boolean
  isLoading?: boolean
  isLoadingAllPlaceCampaigns?: boolean
}

const CampaignContext = React.createContext<ICampaignContext>({
  activeCampaigns: undefined,
  isLoading: false,
})

export default CampaignContext

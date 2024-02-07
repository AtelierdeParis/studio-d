import React from 'react'
import { Campaign } from '~typings/api'

export type CampaignMode =
  | 'disponibilities'
  | 'applications'
  | 'preselections'
  | null

export type ActiveCampaign = Campaign & {
  mode: CampaignMode
  limitDate: string | null
}

interface ICampaignContext {
  activeCampaigns?: ActiveCampaign[]
  currentCampaign?: ActiveCampaign
  isLoading?: boolean
}

const CampaignContext = React.createContext<ICampaignContext>({
  activeCampaigns: undefined,
  isLoading: false,
})

export default CampaignContext

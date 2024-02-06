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
}

const CampaignContext = React.createContext<ICampaignContext>({
  activeCampaigns: undefined,
})

export default CampaignContext

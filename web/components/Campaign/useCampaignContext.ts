import { useContext } from 'react'
import CampaignContext from '~components/Campaign/CampaignContext'

const useCampaignContext = () => {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaignContext must be used within a CampaignProvider')
  }
  return context
}

export default useCampaignContext

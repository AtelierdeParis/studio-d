import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useCampaigns = (query: Record<string, any> = {}) => {
  return useQuery(['campaigns', query], () =>
    client.campaigns.campaignsList(query).then((res) => res.data),
  )
}

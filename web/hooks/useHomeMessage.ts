import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useHomeMessage = (query = {}) => {
  return useQuery('homeMessage', () =>
    client.homeMessage.getHomeMessage(query).then((res) => res.data),
  )
}

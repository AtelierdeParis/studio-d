import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useCurrentUser = (params = {}) => {
  return useQuery(['me'], () =>
    client.get('users/me?include=espace').then((res) => res.data),
  )
}

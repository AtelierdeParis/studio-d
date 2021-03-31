import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useCurrentUser = (params = {}) => {
  return useQuery(['me'], () =>
    client.users.getUsers().then((res) => res.data),
  )
}

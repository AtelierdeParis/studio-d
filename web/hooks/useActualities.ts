import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useActualities = (query: Record<string, any> = {}) => {
  return useQuery(['actualities', query], () =>
    client.actualities.actualitiesList(query).then((res) => res.data),
  )
}

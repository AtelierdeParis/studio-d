import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePlaces = (query: Record<string, any> = {}, name = 'places') => {
  return useQuery([name, query], () =>
    client.espaces.espacesList(query).then((res) => res.data),
  )
}

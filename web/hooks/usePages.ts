import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePages = (query: Record<string, any> = {}, name = 'places') => {
  return useQuery([name, query], () =>
    client.pages.pagesList(query).then((res) => res.data),
  )
}

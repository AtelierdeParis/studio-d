import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePlace = (slug: string, query?: { availableOnly: boolean }) => {
  return useQuery(['place', slug], () =>
    client.espaces.espacesDetail(slug, query).then((res) => res.data),
  )
}

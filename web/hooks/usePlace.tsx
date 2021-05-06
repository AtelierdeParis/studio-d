import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Espace } from '~typings/api'

export const usePlace = (
  slug: string,
  query?: { availableOnly: boolean },
  options?: UseQueryOptions<Espace>,
) => {
  return useQuery(
    ['place', slug],
    () => client.espaces.espacesDetail(slug, query).then((res) => res.data),
    options,
  )
}

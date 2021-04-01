import { useInfiniteQuery } from 'react-query'
import { client } from '~api/client-api'

export const useActualities = (nbActu, limit = 9) => {
  return useInfiniteQuery(
    'actualities',
    ({ pageParam = 0 }) => {
      return client.actualities
        .actualitiesList({
          _limit: limit,
          _start: pageParam * limit,
          _sort: 'id:desc',
        })
        .then((res) => res.data)
    },
    {
      enabled: Boolean(nbActu),
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => {
        if (pages.flat().length < nbActu) return pages.length
      },
    },
  )
}

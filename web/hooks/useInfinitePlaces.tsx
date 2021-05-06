import { useInfiniteQuery } from 'react-query'
import { client } from '~api/client-api'
import { Espaces } from '~typings/api'

export const useInfinitePlaces = (params: Espaces.EspacesList.RequestQuery) => {
  return useInfiniteQuery(
    ['places', params],
    ({ pageParam = 0 }) => {
      return client.espaces
        .espacesList({
          ...params,
          _start: pageParam * (params._limit || 12),
        })
        .then((res) => res.data)
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= params._limit) return pages.length
      },
    },
  )
}

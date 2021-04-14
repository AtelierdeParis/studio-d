import { useInfiniteQuery } from 'react-query'
import { client } from '~api/client-api'

const _limit = 10
export const useConversation = (id, query = null) => {
  return useInfiniteQuery(
    ['conversation', id],
    ({ pageParam = 0 }) =>
      client.conversation
        .conversationDetail(id, {
          ...query,
          _start: pageParam * _limit,
          _limit,
        })
        .then((res) => res.data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= _limit) return pages.length
      },
    },
  )
}

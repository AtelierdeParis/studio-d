import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Message } from '~typings/api'

const _limit = 30
export const useConversation = (
  id,
  options?: UseInfiniteQueryOptions<Message[]>,
) => {
  return useInfiniteQuery(
    ['conversation', id],
    ({ pageParam = 0 }) =>
      client.conversation
        .conversationDetail(id, {
          _start: pageParam * _limit,
          _limit,
        })
        .then((res) => res.data),
    {
      ...options,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= _limit) return pages.length
      },
    },
  )
}

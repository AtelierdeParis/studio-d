import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useConversation = (id) => {
  return useQuery(['conversation', id], () =>
    client.conversation.conversationDetail(id).then((res) => res.data),
  )
}

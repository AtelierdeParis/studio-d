import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyConversations = () => {
  return useQuery('myConversations', () =>
    client.conversation.getConversation().then((res) => res.data),
  )
}

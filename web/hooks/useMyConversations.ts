import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyConversations = () => {
  return useQuery('myConversations', () =>
    client.messages.getMessages().then((res) => res.data),
  )
}

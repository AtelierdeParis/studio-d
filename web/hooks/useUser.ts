import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useUser = (id: string) => {
  return useQuery(['user', id], () =>
    client.users.usersDetail(id).then((res) => res.data),
  )
}

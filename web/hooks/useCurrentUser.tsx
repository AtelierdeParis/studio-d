import { useQuery } from 'react-query'
import { client } from '~api/client-api'
import { useSession } from 'next-auth/client'

export const useCurrentUser = () => {
  const [session, loading] = useSession()

  return useQuery(
    ['me'],
    () => client.users.getUsers().then((res) => res.data),
    {
      enabled: !loading && Boolean(session),
    },
  )
}

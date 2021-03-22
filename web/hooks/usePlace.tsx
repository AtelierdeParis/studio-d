import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePlace = (id: number) => {
  return useQuery(['place', id], () =>
    client.get(`espaces/${id}`).then((res) => res.data),
  )
}

import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyPlaces = () => {
  return useQuery(['myPlaces'], () =>
    client.get(`espaces/me`).then((res) => res.data),
  )
}

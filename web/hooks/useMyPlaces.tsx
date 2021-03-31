import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyPlaces = () => {
  return useQuery(['myPlaces'], () =>
    client.espaces.myPlaces().then((res) => res.data),
  )
}

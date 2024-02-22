import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyPlaces = (params = {}, options = {}, name = ['myPlaces']) => {
  return useQuery(
    name,
    () => client.espaces.myPlaces(params).then((res) => res.data),
    options,
  )
}

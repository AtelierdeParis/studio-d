import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyPlaces = (params = {}, options = {}) => {
  return useQuery(
    'myPlaces',
    () => client.espaces.myPlaces(params).then((res) => res.data),
    options,
  )
}

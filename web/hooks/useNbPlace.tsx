import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useNbPlace = (query) => {
  return useQuery(['nbPlace', query], () =>
    client.espaces.countList(query).then((res) => res.data),
  )
}

import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useNbPlace = () => {
  return useQuery('nbPlace', () =>
    client.espaces.countList().then((res) => res.data),
  )
}

import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useNbActualities = () => {
  return useQuery('nbActualities', () =>
    client.actualities.countList().then((res) => res.data),
  )
}

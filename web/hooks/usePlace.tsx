import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePlace = (id: string) => {
  return useQuery(['place', Number(id)], () =>
    client.espaces.espacesDetail(id).then((res) => res.data),
  )
}

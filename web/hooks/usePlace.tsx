import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const usePlace = (id: string, query?: { availableOnly: boolean }) => {
  return useQuery(['place', Number(id)], () =>
    client.espaces.espacesDetail(id, query).then((res) => res.data),
  )
}

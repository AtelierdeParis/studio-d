import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyRequests = () => {
  return useQuery('myRequests', () =>
    client.bookings.requestsMeList().then((res) => res.data),
  )
}

import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useMyBookings = () => {
  return useQuery('myBookings', () =>
    client.bookings.getMyBookings().then((res) => res.data),
  )
}

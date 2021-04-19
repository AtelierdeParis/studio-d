import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useBookings = (params = {}) => {
  return useQuery('bookings', () =>
    client.bookings.bookingsList(params).then((res) => res.data),
  )
}

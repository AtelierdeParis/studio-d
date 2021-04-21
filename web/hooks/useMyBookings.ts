import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Booking } from '~typings/api'

export const useMyBookings = (
  type: 'all' | 'request' | 'booking' = 'all',
  options: UseQueryOptions<Booking[]> = {},
) => {
  return useQuery(
    ['myBookings', type],
    () => client.bookings.getMyBookings(type).then((res) => res.data),
    options,
  )
}

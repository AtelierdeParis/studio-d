import { useQuery, UseQueryOptions } from 'react-query'
import { client } from '~api/client-api'
import { Booking } from '~typings/api'

export const useBooking = (id: string, options?: UseQueryOptions<Booking>) => {
  return useQuery(
    ['booking', id],
    () => client.bookings.bookingsDetail(id).then((res) => res.data),
    options,
  )
}

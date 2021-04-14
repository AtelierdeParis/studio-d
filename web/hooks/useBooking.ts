import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useBooking = (id: string) => {
  return useQuery(['booking', id], () =>
    client.bookings.bookingsDetail(id).then((res) => res.data),
  )
}

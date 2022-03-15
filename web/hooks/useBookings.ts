import { useQuery } from 'react-query'
import { client } from '~api/client-api'

export const useBookings = (conversationId: string, params = {}) => {
  return useQuery(['bookings', conversationId.toString()], () =>
    client.bookings.bookingsList(params).then((res) => res.data),
  )
}

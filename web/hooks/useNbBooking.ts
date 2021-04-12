import { useMemo } from 'react'
import { Disponibility } from '~typings/api'
import isPast from 'date-fns/isPast'

const add = (booking, array) => {
  if (!array.some((el) => el.id === booking.id)) {
    array.push(booking)
  }
}

const useNbBooking = (disponibilities: Disponibility[] = []) => {
  return useMemo(
    () =>
      disponibilities.reduce(
        (total, current) => {
          if (!current?.booking) return total

          if (
            current.booking?.status === 'accepted' &&
            isPast(new Date(current.end))
          ) {
            add(current.booking, total.past)
          } else {
            switch (current.booking?.status) {
              case 'accepted':
                add(current.booking, total.coming)
                break
              case 'pending':
                add(current.booking, total.pending)
                break
            }
          }

          return total
        },
        {
          coming: [],
          pending: [],
          past: [],
        },
      ),
    [disponibilities],
  )
}

export default useNbBooking

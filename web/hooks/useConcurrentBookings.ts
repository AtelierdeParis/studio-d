import React, { useMemo } from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import isSameDay from 'date-fns/isSameDay'
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'

const useConcurrentBookings = (bookings, event: ScheduleEvent, user) => {
  const {
    extendedProps: { when, type },
    start,
    end,
  } = event

  return useMemo(() => {
    if (!bookings || bookings.length === 0 || (user && user.type === 'place'))
      return { hasAnotherBooking: false }
    const concurrentBookings = bookings.filter((booking) => {
      if (!['pending', 'accepted'].includes(booking.status)) return false
      return booking.disponibilities.some((dispo) => {
        const sameDay = isSameDay(new Date(dispo.start), start)
        switch (dispo.type) {
          case 'period':
            return areIntervalsOverlapping(
              { start: new Date(dispo.start), end: new Date(dispo.end) },
              { start, end },
            )
          case 'punctual':
            return (dispo.when === when || type === 'day') && sameDay
          case 'day':
            return sameDay
        }
      })
    })
    const hasAnotherBooking = concurrentBookings.length > 0
    return {
      concurrentBooking: hasAnotherBooking ? concurrentBookings[0] : [],
      hasAnotherBooking,
    }
  }, [bookings])
}

export default useConcurrentBookings

import React from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'

interface IBookingScheduleContext {
  selected: ScheduleEvent[]
  setSelected: (selected: ScheduleEvent[]) => void
  showConfirmView: boolean
  setConfirmView: (value: boolean) => void
  showApplicationView: boolean
  setApplicationView: (value: boolean) => void
}

const BookingScheduleContext = React.createContext<IBookingScheduleContext>({
  selected: [],
  setSelected: null,
  showConfirmView: false,
  setConfirmView: null,
  showApplicationView: false,
  setApplicationView: null,
})

export default BookingScheduleContext

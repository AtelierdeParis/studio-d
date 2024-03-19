import React, { useState } from 'react'
import BookingScheduleContext from '~components/Place/Booking/BookingScheduleContext'

interface IBookingScheduleProvider {
  children: React.ReactNode
}

const BookingScheduleProvider = ({ children }: IBookingScheduleProvider) => {
  const [selected, setSelected] = useState([])
  const [showConfirmView, setConfirmView] = useState(false)
  const [showApplicationView, setApplicationView] = useState(false)

  return (
    <BookingScheduleContext.Provider
      value={{
        selected,
        setSelected,
        showConfirmView,
        setConfirmView,
        showApplicationView,
        setApplicationView,
      }}
    >
      {children}
    </BookingScheduleContext.Provider>
  )
}

export default BookingScheduleProvider

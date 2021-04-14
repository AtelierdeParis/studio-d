import React, { useState } from 'react'
import BookingScheduleContext from '~components/Place/BookingScheduleContext'

interface IBookingScheduleProvider {
  children: React.ReactNode
}

const BookingScheduleProvider = ({ children }: IBookingScheduleProvider) => {
  const [selected, setSelected] = useState([])
  const [showConfirmView, setConfirmView] = useState(false)

  return (
    <BookingScheduleContext.Provider
      value={{
        selected,
        setSelected,
        showConfirmView,
        setConfirmView,
      }}
    >
      {children}
    </BookingScheduleContext.Provider>
  )
}

export default BookingScheduleProvider

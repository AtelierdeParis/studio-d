export const getBookingType = (status) => {
  if (
    ['pending', 'requestcanceled', 'requestcanceledbyplace'].includes(status)
  ) {
    return 'request'
  } else if (
    ['past', 'accepted', 'bookingcanceledbyplace', 'askcancel'].includes(status)
  ) {
    return 'booking'
  }
  return null
}

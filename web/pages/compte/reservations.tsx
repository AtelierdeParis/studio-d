import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoBooking from '~components/Account/Info/InfoBooking'
import BookingList from '~components/Account/Booking/BookingList'
import { requireAuth } from '~utils/auth'
import Loading from '~components/Loading'
import { useMyBookings } from '~hooks/useMyBookings'

const AccountBooking = () => {
  const { data: bookings, isLoading } = useMyBookings('booking')

  return (
    <Loading isLoading={isLoading} isCentered>
      {bookings?.length === 0 ? (
        <InfoBooking />
      ) : (
        <BookingList bookings={bookings} type="booking" />
      )}
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account', 'booking'])),
      },
    }
  },
)

export default AccountBooking

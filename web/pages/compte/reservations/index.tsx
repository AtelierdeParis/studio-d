import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoBooking from '~components/Account/Info/InfoBooking'
import BookingList from '~components/Account/Booking/BookingList'
import { requireAuth } from '~utils/auth'
import Loading from '~components/Loading'
import { useMyBookings } from '~hooks/useMyBookings'
import { UsersPermissionsUser } from '~typings/api'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'

interface Props {
  user: UsersPermissionsUser
}

const AccountBooking = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { data: bookings, isLoading } = useMyBookings('booking')

  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo title={t('title.bookings')} />
      {bookings?.length === 0 ? (
        <InfoBooking user={user} />
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

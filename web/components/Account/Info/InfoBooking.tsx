import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_REQUEST, ROUTE_PLACES } from '~constants'

const InfoBooking = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/booking.png"
      title={t('bookings.info.title')}
      links={[
        {
          url: ROUTE_ACCOUNT_REQUEST,
          text: t('bookings.info.link1'),
        },
        {
          url: ROUTE_PLACES,
          text: t('bookings.info.link2'),
        },
      ]}
    >
      {t('bookings.info.text')}
    </Info>
  )
}

export default InfoBooking

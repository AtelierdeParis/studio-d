import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import {
  ROUTE_ACCOUNT_REQUEST,
  ROUTE_PLACES,
  ROUTE_ACCOUNT_PLACES,
} from '~constants'
import { UsersPermissionsUser } from '~typings/api'

interface Props {
  user: UsersPermissionsUser
}

const InfoBooking = ({ user }: Props) => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/booking.svg"
      title={t('bookings.info.title')}
      links={[
        {
          url: ROUTE_ACCOUNT_REQUEST,
          text: t('bookings.info.link1'),
        },
        {
          url: user.type === 'place' ? ROUTE_ACCOUNT_PLACES : ROUTE_PLACES,
          text: t(`bookings.info.link2.${user.type}`),
        },
      ]}
    >
      {t('bookings.info.text')}
    </Info>
  )
}

export default InfoBooking

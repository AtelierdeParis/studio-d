import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACES, ROUTE_PLACES } from '~constants'
import { UsersPermissionsUser } from '~typings/api'

interface Props {
  user: UsersPermissionsUser
}

const InfoRequest = ({ user }: Props) => {
  const { t } = useTranslation('account')

  return (
    <Info
      img="/assets/img/requests.svg"
      title={t(`requests.info.title`)}
      links={{
        url: user.type === 'place' ? ROUTE_ACCOUNT_PLACES : ROUTE_PLACES,
        text: t(`requests.info.link.${user.type}`),
      }}
    >
      {t(`requests.info.text.${user.type}`)}
    </Info>
  )
}

export default InfoRequest

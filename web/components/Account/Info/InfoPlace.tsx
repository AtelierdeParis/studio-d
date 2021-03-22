import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_ADD_PLACES } from '~constants'

const InfoPlace = () => {
  const { t } = useTranslation('place')
  return (
    <Info
      img="/assets/img/places.png"
      title={t('info.title')}
      links={{
        url: ROUTE_ACCOUNT_ADD_PLACES,
        text: t('info.link'),
      }}
    >
      {t('info.text')}
    </Info>
  )
}

export default InfoPlace

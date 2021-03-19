import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_ADD_PLACES } from '~constants'

const InfoPlace = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/places.png"
      title={t('places.info.title')}
      links={{
        url: ROUTE_ACCOUNT_ADD_PLACES,
        text: t('places.info.link'),
      }}
    >
      {t('places.info.text')}
    </Info>
  )
}

export default InfoPlace

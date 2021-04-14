import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_PLACES } from '~constants'

const InfoRequest = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/requests.svg"
      title={t('requests.info.title')}
      links={{
        url: ROUTE_PLACES,
        text: t('requests.info.link'),
      }}
    >
      {t('requests.info.text')}
    </Info>
  )
}

export default InfoRequest

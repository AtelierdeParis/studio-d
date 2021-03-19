import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'
import { ROUTE_PLACES } from '~constants'

const InfoMessage = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/message.png"
      title={t('message.info.title')}
      links={{
        url: ROUTE_PLACES,
        text: t('message.info.link'),
      }}
    >
      {t('message.info.text')}
    </Info>
  )
}

export default InfoMessage

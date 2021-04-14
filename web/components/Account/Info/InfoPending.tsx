import React from 'react'
import Info from '~components/Account/Info/Info'
import { useTranslation } from 'next-i18next'

const InfoPending = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/pending.svg"
      title={t('pending')}
      links={{
        url: '/',
        text: t('backWebsite'),
      }}
    >
      {t('pendingText')}
    </Info>
  )
}

export default InfoPending

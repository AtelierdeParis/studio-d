import React from 'react'
import Info from '~components/Account/Info/Info'
import { ROUTE_CGU, ROUTE_PLACES } from '~constants'
import { useTranslation, Trans } from 'next-i18next'
import Link from '~components/Link'

const InfoWelcome = () => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/welcome.svg"
      title={t('welcome')}
      links={{
        url: ROUTE_PLACES,
        text: t('seePlaces'),
      }}
    >
      <Trans
        i18nKey="account:welcomeText"
        components={{
          a: <Link href={ROUTE_CGU} textDecoration="underline" />,
        }}
      />
    </Info>
  )
}

export default InfoWelcome

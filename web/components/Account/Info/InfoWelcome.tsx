import React from 'react'
import Info from '~components/Account/Info/Info'
import { ROUTE_CGU, ROUTE_PLACES, ROUTE_ACCOUNT_PLACES } from '~constants'
import { useTranslation, Trans } from 'next-i18next'
import Link from '~components/Link'
import { UsersPermissionsUser } from '~typings/api'
interface Props {
  user: UsersPermissionsUser
}

const InfoWelcome = ({ user }: Props) => {
  const { t } = useTranslation('account')
  return (
    <Info
      img="/assets/img/welcome.svg"
      title={t('welcome')}
      links={{
        url: user.type === 'company' ? ROUTE_PLACES : ROUTE_ACCOUNT_PLACES,
        text: user.type === 'company' ? t('seePlaces') : t('seeMyPlaces'),
      }}
    >
      <Trans
        i18nKey={`account:welcomeText.${user.type}`}
        components={{
          a: <Link href={ROUTE_CGU} textDecoration="underline" />,
        }}
      />
    </Info>
  )
}

export default InfoWelcome

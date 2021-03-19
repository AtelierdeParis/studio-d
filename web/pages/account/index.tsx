import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoLogo from '~components/Account/InfoLogo'
import Link from '~components/Link'
import { ROUTE_CGU } from '~constants'
import { useTranslation, Trans } from 'next-i18next'
import { User } from '~@types/user.d'

interface IAccountDashboard {
  user: User
}

const AccountDashboard = ({ user }: IAccountDashboard) => {
  const { t } = useTranslation('account')

  if (user.confirmed) {
    return (
      <InfoLogo
        img="/assets/img/welcome.png"
        title={t('welcome')}
        links={{
          url: '/',
          text: t('backWebsite'),
        }}
      >
        <Trans
          i18nKey="account:welcomeText"
          components={{
            a: <Link href={ROUTE_CGU} textDecoration="underline" />,
          }}
        />
      </InfoLogo>
    )
  }

  return (
    <InfoLogo
      img="/assets/img/pending.png"
      title={t('pending')}
      links={{
        url: '/',
        text: t('backWebsite'),
      }}
    >
      {t('pendingText')}
    </InfoLogo>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['account'])),
    },
  }
}

export default AccountDashboard

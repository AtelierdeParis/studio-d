import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoWelcome from '~components/Account/Info/InfoWelcome'
import InfoPending from '~components/Account/Info/InfoPending'
import { User } from '~@types/user.d'

interface IAccountDashboard {
  user: User
}

const AccountDashboard = ({ user }: IAccountDashboard) => {
  if (user?.confirmed) {
    return <InfoWelcome />
  }

  return <InfoPending />
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

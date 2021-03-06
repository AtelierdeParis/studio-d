import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoWelcome from '~components/Account/Info/InfoWelcome'
import InfoPending from '~components/Account/Info/InfoPending'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'

interface Props {
  user: UsersPermissionsUser
}

const AccountDashboard = ({ user }: Props) => {
  if (user?.confirmed && user?.accepted) {
    return <InfoWelcome user={user} />
  }

  return <InfoPending />
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account'])),
      },
    }
  },
)

export default AccountDashboard

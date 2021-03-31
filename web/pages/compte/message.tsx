import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoMessage from '~components/Account/Info/InfoMessage'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
interface IAccountMessage {
  user: UsersPermissionsUser
}

const AccountMessage = ({ user }: IAccountMessage) => {
  return <InfoMessage />
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

export default AccountMessage

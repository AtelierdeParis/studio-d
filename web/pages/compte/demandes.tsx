import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoRequest from '~components/Account/Info/InfoRequest'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
interface IAccountRequest {
  user: UsersPermissionsUser
}

const AccountRequest = ({ user }: IAccountRequest) => {
  return <InfoRequest />
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

export default AccountRequest

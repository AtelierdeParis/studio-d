import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoBooking from '~components/Account/Info/InfoBooking'
import { User } from '~@types/user.d'
import { requireAuth } from '~utils'
interface IAccountBooking {
  user: User
}

const AccountBooking = ({ user }: IAccountBooking) => {
  return <InfoBooking />
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

export default AccountBooking

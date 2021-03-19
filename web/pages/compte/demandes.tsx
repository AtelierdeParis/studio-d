import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoRequest from '~components/Account/Info/InfoRequest'
import { User } from '~@types/user.d'

interface IAccountRequest {
  user: User
}

const AccountRequest = ({ user }: IAccountRequest) => {
  return <InfoRequest />
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

export default AccountRequest

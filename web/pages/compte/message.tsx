import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoMessage from '~components/Account/Info/InfoMessage'
import { User } from '~@types/user.d'

interface IAccountMessage {
  user: User
}

const AccountMessage = ({ user }: IAccountMessage) => {
  return <InfoMessage />
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

export default AccountMessage

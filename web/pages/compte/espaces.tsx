import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoPlace from '~components/Account/Info/InfoPlace'
import { User } from '~@types/user.d'

interface IAccountPlace {
  user: User
}

const AccountPlace = ({ user }: IAccountPlace) => {
  return <InfoPlace />
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['account', 'place'])),
    },
  }
}

export default AccountPlace

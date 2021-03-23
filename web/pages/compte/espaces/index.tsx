import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoPlace from '~components/Account/Info/InfoPlace'
import PlaceList from '~components/Account/Place/PlaceList'
import Loading from '~components/Loading'
import { useMyPlaces } from '~hooks/useMyPlaces'
import { User } from '~@types/user.d'

interface IAccountPlace {
  user: User
}

const AccountPlace = ({ user }: IAccountPlace) => {
  const { data: places, isLoading } = useMyPlaces()
  return (
    <Loading isLoading={isLoading}>
      {places?.length === 0 ? <InfoPlace /> : <PlaceList places={places} />}
    </Loading>
  )
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

import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoPlace from '~components/Account/Info/InfoPlace'
import PlaceList from '~components/Account/Place/PlaceList'
import Loading from '~components/Loading'
import { useMyPlaces } from '~hooks/useMyPlaces'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
interface IAccountPlace {
  user: UsersPermissionsUser
}

const AccountPlace = ({ user }: IAccountPlace) => {
  const { data: places, isLoading } = useMyPlaces()
  return (
    <Loading isLoading={isLoading} isCentered>
      {places?.length === 0 ? <InfoPlace /> : <PlaceList places={places} />}
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'account',
          'place',
          'modal',
        ])),
      },
    }
  },
)

export default AccountPlace

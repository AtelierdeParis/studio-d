import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoRequest from '~components/Account/Info/InfoRequest'
import BookingList from '~components/Account/Booking/BookingList'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import Loading from '~components/Loading'
import { useMyBookings } from '~hooks/useMyBookings'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { useMyApplications } from '~hooks/useMyApplications'
import { Box } from '@chakra-ui/react'
interface Props {
  user: UsersPermissionsUser
}

const CompanyApplications = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { data: applications, isLoading } = useMyApplications()

  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo title={t('title.requests')} />
      {applications?.length === 0 ? (
        <InfoRequest user={user} />
      ) : (
        <Box>Applications</Box>
      )}
    </Loading>
  )
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

export default CompanyApplications

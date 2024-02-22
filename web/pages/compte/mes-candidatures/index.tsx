import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import Loading from '~components/Loading'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { useMyApplications } from '~hooks/useMyApplications'
import InfoCompanyApplications from '~components/Account/Info/InfoCompanyApplications'
import ApplicationCompanyList from '~components/Account/Application/Company/ApplicationCompanyList'
import useCampaignContext from '~components/Campaign/useCampaignContext'
interface Props {
  user: UsersPermissionsUser
}

const CompanyApplications = ({ user }: Props) => {
  const { t } = useTranslation('account')
  const { currentCampaign } = useCampaignContext()
  const { data: applications, isLoading } = useMyApplications({
    campaignId: currentCampaign?.id,
    options: { enabled: !!currentCampaign?.id },
  })
  if (!currentCampaign) return null
  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo title={t('title.requests')} />
      {applications?.length === 0 ? (
        <InfoCompanyApplications user={user} />
      ) : (
        <ApplicationCompanyList applications={applications} />
      )}
    </Loading>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account', 'application'])),
      },
    }
  },
)

export default CompanyApplications

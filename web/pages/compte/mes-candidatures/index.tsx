import React, { useEffect } from 'react'
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
import { useRouter } from 'next/router'
import { ROUTE_ACCOUNT } from '~constants'
interface Props {
  user: UsersPermissionsUser
}

const CompanyApplications = ({ user }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('account')
  const { currentCampaign, isLoading: isLoadingCampaign } = useCampaignContext()
  const { data: applications, isLoading } = useMyApplications({
    options: { enabled: !!currentCampaign?.id },
    searchParams: {
      _sort: 'disponibility.start:asc',
      //@ts-expect-error
      'disponibility.campaign': currentCampaign?.id,
    },
  })

  useEffect(() => {
    if (!currentCampaign && !isLoadingCampaign) {
      router.push(ROUTE_ACCOUNT)
    }
  }, [currentCampaign])

  if (!currentCampaign) return null
  return (
    <Loading isLoading={isLoading} isCentered>
      <NextSeo title={t('title.requests')} />
      {Boolean(
        applications?.length === 0 ||
          currentCampaign?.mode === 'disponibilities',
      ) ? (
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
        ...(await serverSideTranslations(locale, [
          'account',
          'application',
          'place',
        ])),
      },
    }
  },
)

export default CompanyApplications

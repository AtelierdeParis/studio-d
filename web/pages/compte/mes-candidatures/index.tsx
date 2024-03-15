import { GetServerSideProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ApplicationCompanyList from '~components/Account/Application/Company/ApplicationCompanyList'
import InfoCompanyApplications from '~components/Account/Info/InfoCompanyApplications'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Loading from '~components/Loading'
import { ROUTE_ACCOUNT } from '~constants'
import { useMyApplications } from '~hooks/useMyApplications'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
interface Props {
  user: UsersPermissionsUser
}

const CompanyApplications = ({ user }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('account')
  const { currentCampaign, isLoading: isLoadingCampaign } = useCampaignContext()
  const { data: applications, isLoading } = useMyApplications({
    options: { enabled: !!currentCampaign?.id },
    name: ['myApplications', currentCampaign?.id],
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

  if (!currentCampaign) {
    return null
  }

  if (currentCampaign?.mode === 'closed') {
    router.push(ROUTE_ACCOUNT)
    return null
  }

  if (currentCampaign?.mode === 'preselections' && applications?.length === 0) {
    router.push(ROUTE_ACCOUNT)
    return null
  }

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

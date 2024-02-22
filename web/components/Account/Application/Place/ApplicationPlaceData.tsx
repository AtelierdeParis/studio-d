import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useMyApplications } from '~hooks/useMyApplications'
import ApplicationPlaceList from '~components/Account/Application/Place/ApplicationPlaceList'
import InfoPlaceApplications from '~components/Account/Info/InfoPlaceApplications'
import Loading from '~components/Loading'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { useEffect } from 'react'

const ApplicationPlaceData = ({ searchParams }) => {
  const { data: user } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()

  const {
    data: applications,
    isLoading,
    refetch,
    isFetching,
  } = useMyApplications({
    campaignId: currentCampaign?.id,
    searchParams,
    options: {
      enabled:
        Boolean(searchParams?.disponibility_eq) &&
        Boolean(searchParams?.espace_eq),
    },
  })

  useEffect(() => {
    refetch()
  }, [JSON.stringify(searchParams)])

  return (
    <Loading isLoading={isLoading || isFetching} isCentered>
      {applications?.length === 0 ? (
        <InfoPlaceApplications user={user} />
      ) : (
        <ApplicationPlaceList applications={applications} />
      )}
    </Loading>
  )
}

export default ApplicationPlaceData

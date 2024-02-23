import { useQuery } from 'react-query'
import { client } from '~api/client-api'
import { useSession } from 'next-auth/client'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useMemo } from 'react'

export const useCurrentUser = () => {
  const [session, loading] = useSession()
  const { currentCampaign } = useCampaignContext()

  const userData = useQuery(
    ['me'],
    () => client.users.getUsers().then((res) => res.data),
    {
      enabled: !loading && Boolean(session),
    },
  )

  const applications = useMemo(() => {
    if (userData && currentCampaign) {
      //@ts-expect-error
      return userData?.data?.companyApplications?.filter(
        (application) =>
          currentCampaign && application?.campaign === currentCampaign?.id,
      )
    }
  }, [userData?.data, currentCampaign])

  return {
    ...userData,
    applications,
    canApply:
      userData?.data?.type === 'company' &&
      currentCampaign?.applications_max &&
      applications?.length < currentCampaign?.applications_max,
    remainingApplications:
      currentCampaign?.applications_max - applications?.length,
  }
}

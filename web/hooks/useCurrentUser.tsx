import { useQuery } from 'react-query'
import { client } from '~api/client-api'
import { useSession } from 'next-auth/client'
import useCampaignContext from '~components/Campaign/useCampaignContext'

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

  return {
    ...userData,
    //@ts-expect-error
    applications: userData?.data?.companyApplications?.filter(
      (application) => application?.campaign?.id === currentCampaign?.id,
    ),
  }
}

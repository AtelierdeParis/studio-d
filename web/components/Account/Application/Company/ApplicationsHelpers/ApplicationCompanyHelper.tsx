import useCampaignContext from '~components/Campaign/useCampaignContext'
import { useCurrentUser } from '~hooks/useCurrentUser'
import OpenApplications from '~components/Account/Application/Company/ApplicationsHelpers/OpenApplications'
import ClosedApplications from '~components/Account/Application/Company/ApplicationsHelpers/ClosedApplications'
import { getEndDateTime } from '~components/Campaign/CampaignProvider'
import FullApplications from '~components/Account/Application/Company/ApplicationsHelpers/FullApplications'

const ApplicationCompanyHelper = () => {
  const { remainingApplications, applications } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()
  const today = new Date()

  if (
    applications?.length > 0 &&
    !remainingApplications &&
    currentCampaign.mode === 'applications'
  ) {
    return <FullApplications numApplications={applications?.length} />
  }

  if (remainingApplications > 0 && currentCampaign.mode === 'applications')
    return <OpenApplications remainingApplications={remainingApplications} />

  if (
    today <= getEndDateTime(currentCampaign.preselection_end) &&
    today >= getEndDateTime(currentCampaign.application_end)
  ) {
    return <ClosedApplications />
  }
  return null
}

export default ApplicationCompanyHelper

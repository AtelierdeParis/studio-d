import useCampaignContext from '~components/Campaign/useCampaignContext'
import MissingSelections from '~components/Account/Application/Place/ApplicationsHelpers/MissingSelections'
import ConfirmSelections from '~components/Account/Application/Place/ApplicationsHelpers/ConfirmSelections'
import ValidatedSelections from '~components/Account/Application/Place/ApplicationsHelpers/ValidatedSelections'
import { Application } from '~typings/api'
import { useRouter } from 'next/router'
import ClosedCampaign from '~components/Account/Application/Place/ApplicationsHelpers/ClosedCampaign'

const ApplicationPlaceHelper = ({
  applications,
}: {
  applications: Application[]
}) => {
  const { allPlaceCampaigns } = useCampaignContext()
  const preselections = applications?.filter(
    (application) => application?.status === 'preselected',
  ).length

  const { query } = useRouter()
  const selectedCampaign = allPlaceCampaigns?.find(
    (c) => c.id.toString() === query.campaign.toString(),
  )
  const missingPreselections =
    selectedCampaign?.preselections_max - preselections

  const validatedApplications = applications?.filter(
    (application) => application?.status === 'confirmed',
  ).length

  if (selectedCampaign?.mode === 'preselections' && validatedApplications > 0) {
    return <ValidatedSelections />
  }
  if (selectedCampaign?.mode === 'preselections' && missingPreselections > 0) {
    return <MissingSelections missingPreselections={missingPreselections} />
  }

  if (
    selectedCampaign?.mode === 'preselections' &&
    missingPreselections === 0
  ) {
    return <ConfirmSelections preselections={preselections} />
  }

  if (selectedCampaign?.mode === 'closed') {
    return <ClosedCampaign />
  }

  return null
}

export default ApplicationPlaceHelper

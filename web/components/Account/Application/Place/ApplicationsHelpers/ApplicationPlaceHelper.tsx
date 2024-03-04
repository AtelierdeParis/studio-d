import MissingSelections from '~components/Account/Application/Place/ApplicationsHelpers/MissingSelections'
import ConfirmSelections from '~components/Account/Application/Place/ApplicationsHelpers/ConfirmSelections'
import ValidatedSelections from '~components/Account/Application/Place/ApplicationsHelpers/ValidatedSelections'
import { Application } from '~typings/api'
import ClosedCampaign from '~components/Account/Application/Place/ApplicationsHelpers/ClosedCampaign'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const ApplicationPlaceHelper = ({
  applications,
}: {
  applications: Application[]
}) => {
  const preselectedApplications = applications?.filter(
    (application) => application?.status === 'preselected',
  )
  const preselections = preselectedApplications?.length

  const { selectedCampaign } = useSelectedCampaign()
  const missingPreselections =
    selectedCampaign?.preselections_max - preselections

  const validatedApplications = applications?.filter(
    (application) => application?.status === 'confirmed',
  ).length

  if (selectedCampaign?.mode === 'preselections' && validatedApplications > 0) {
    return <ValidatedSelections />
  }
  if (
    selectedCampaign?.mode === 'preselections' &&
    missingPreselections > 0 &&
    applications?.length > 0
  ) {
    return <MissingSelections missingPreselections={missingPreselections} />
  }

  if (
    selectedCampaign?.mode === 'preselections' &&
    missingPreselections === 0 &&
    preselections > 0
  ) {
    return (
      <ConfirmSelections preselectedApplications={preselectedApplications} />
    )
  }

  if (selectedCampaign?.mode === 'closed') {
    return <ClosedCampaign />
  }

  return null
}

export default ApplicationPlaceHelper

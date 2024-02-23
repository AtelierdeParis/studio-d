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
  const preselections = applications?.filter(
    (application) => application?.status === 'preselected',
  ).length

  const { selectedCampaign } = useSelectedCampaign()
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

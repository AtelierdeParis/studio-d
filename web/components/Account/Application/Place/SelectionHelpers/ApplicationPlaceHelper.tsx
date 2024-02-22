import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import MissingSelections from '~components/Account/Application/Place/SelectionHelpers/MissingSelections'
import ConfirmSelections from '~components/Account/Application/Place/SelectionHelpers/ConfirmSelections'
import ValidatedSelections from '~components/Account/Application/Place/SelectionHelpers/ValidatedSelections'
import { Application } from '~typings/api'

const ApplicationPlaceHelper = ({
  applications,
}: {
  applications: Application[]
}) => {
  const { t } = useTranslation('application')
  const { currentCampaign } = useCampaignContext()
  const preselections = applications?.filter(
    (application) => application?.status === 'preselected',
  ).length
  const missingPreselections =
    currentCampaign?.preselections_max - preselections

  const validatedApplications = applications?.filter(
    (application) => application?.status === 'confirmed',
  ).length

  if (currentCampaign?.mode === 'preselections' && validatedApplications > 0) {
    return <ValidatedSelections />
  }
  if (currentCampaign?.mode === 'preselections' && missingPreselections > 0) {
    return <MissingSelections missingPreselections={missingPreselections} />
  }

  if (currentCampaign?.mode === 'preselections' && missingPreselections === 0) {
    return <ConfirmSelections preselections={preselections} />
  }

  return null
}

export default ApplicationPlaceHelper

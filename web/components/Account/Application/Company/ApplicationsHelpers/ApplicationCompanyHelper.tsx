import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { ROUTE_PLACES } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { format } from '~utils/date'
import Link from '~components/Link'
import OpenApplications from '~components/Account/Application/Company/ApplicationsHelpers/OpenApplications'
import ClosedApplications from '~components/Account/Application/Company/ApplicationsHelpers/ClosedApplications'

const ApplicationCompanyHelper = () => {
  const { remainingApplications } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('application')
  if (remainingApplications > 0 && currentCampaign.mode === 'applications')
    return <OpenApplications remainingApplications={remainingApplications} />

  if (currentCampaign.mode === 'preselections') {
    return <ClosedApplications />
  }
  return null
}

export default ApplicationCompanyHelper

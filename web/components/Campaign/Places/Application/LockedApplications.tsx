import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_MY_APPLICATIONS } from '~constants'
import { useCurrentUser } from '~hooks/useCurrentUser'

const LockedApplications = () => {
  const { t } = useTranslation('place')
  const { data: user, canApply, applications } = useCurrentUser()
  const { currentCampaign } = useCampaignContext()

  if (!canApply && user?.type === 'company')
    return (
      <Box backgroundColor="gray.100" p={6} width="100%" borderRadius="8px">
        <Text as="span" fontWeight="bold">
          {t('detail.campaign.locked_application_start', {
            nb: applications?.length,
          })}
        </Text>
        <Text as="span" pl={1}>
          {t('detail.campaign.locked_application_middle', {
            title: currentCampaign?.title,
          })}
        </Text>
        <Link href={ROUTE_ACCOUNT_MY_APPLICATIONS}>
          <Text as="span" pl={1} textDecoration="underline">
            {t('detail.campaign.locked_application_cta')}
          </Text>
        </Link>
        <Text as="span" pl={1}>
          {t('detail.campaign.locked_application_end')}
        </Text>
      </Box>
    )
  return null
}

export default LockedApplications

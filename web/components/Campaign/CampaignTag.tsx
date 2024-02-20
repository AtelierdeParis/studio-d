import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Tag from '~components/Tag'
import { useCurrentUser } from '~hooks/useCurrentUser'
import ApplicationCheck from 'public/assets/img/applicationCheck.svg'

const CampaignTag = ({
  isGrid,
  isCampaignTab,
  disponibilitiesIds,
}: {
  isGrid?: boolean
  isCampaignTab?: boolean
  disponibilitiesIds?: string[]
}) => {
  const { applications } = useCurrentUser()
  const { currentCampaign, isCampaignPlace } = useCampaignContext()
  const { t } = useTranslation('common')

  if (
    applications
      ?.map((el) => el?.disponibility)
      .some((el) => disponibilitiesIds?.includes(el))
  ) {
    return (
      <Box position={isGrid ? 'relative' : undefined}>
        <Tag
          status="application"
          style={
            isGrid ? { position: 'absolute', top: 4, right: 4, zIndex: 2 } : {}
          }
          paddingX={'9px'}
          paddingY={'5px'}
        >
          {t('campaign.application')}
          <Box pl={2}>
            <ApplicationCheck />
          </Box>
        </Tag>
      </Box>
    )
  }

  if (isCampaignPlace && !isCampaignTab) {
    return (
      <Box position={isGrid ? 'relative' : undefined}>
        <Tag
          status="campaign"
          style={
            isGrid ? { position: 'absolute', top: 4, right: 4, zIndex: 2 } : {}
          }
          paddingX={'9px'}
          paddingY={'5px'}
        >
          {t('campaign.partner', {
            title: currentCampaign?.title,
          })}
        </Tag>
      </Box>
    )
  }

  return null
}

export default CampaignTag

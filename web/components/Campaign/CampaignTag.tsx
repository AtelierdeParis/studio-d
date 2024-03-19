import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Tag from '~components/Tag'
import { useCurrentUser } from '~hooks/useCurrentUser'
import ApplicationCheck from 'public/assets/img/applicationCheck.svg'

const CampaignTag = ({
  isGrid,
  mode,
  disponibilitiesIds,
  hasCampaignDispo,
}: {
  isGrid?: boolean
  mode?: 'solidarity' | 'campaign'
  disponibilitiesIds?: string[]
  hasCampaignDispo?: boolean
}) => {
  const { applications } = useCurrentUser()
  const { currentCampaign, hasActiveCampaign } = useCampaignContext()
  const { t } = useTranslation('common')

  if (
    applications
      ?.map((el) => el?.disponibility)
      .some((el) => disponibilitiesIds?.includes(el)) &&
    hasActiveCampaign &&
    mode === 'campaign'
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

  if (hasCampaignDispo && mode === 'solidarity') {
    return (
      <Box position={isGrid ? 'relative' : undefined}>
        <Tag
          status="campaign"
          style={
            isGrid ? { position: 'absolute', top: 4, right: 4, zIndex: 2 } : {}
          }
          paddingX={'9px'}
          paddingY={'5px'}
          maxW="90%"
        >
          <Box
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: '100%', // Adjust this value as needed
            }}
          >
            {t('campaign.partner', {
              title: currentCampaign?.title,
            })}
          </Box>
        </Tag>
      </Box>
    )
  }

  return null
}

export default CampaignTag

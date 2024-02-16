import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import Tag from '~components/Tag'

const CampaignTag = ({ isGrid }: { isGrid?: boolean }) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('common')

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

export default CampaignTag

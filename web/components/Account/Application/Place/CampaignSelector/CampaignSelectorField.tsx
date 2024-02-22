import { Select, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const CampaignSelectorField = () => {
  const { t } = useTranslation('application')
  const router = useRouter()
  const { allPlaceCampaigns, isLoadingAllPlaceCampaigns } = useCampaignContext()
  if (isLoadingAllPlaceCampaigns || !allPlaceCampaigns) {
    return null
  }

  if (allPlaceCampaigns.length === 1) {
    return (
      <Text
        backgroundColor="blue.100"
        color="blue.500"
        p={2}
        borderRadius="18px"
        paddingX={4}
      >
        {t('place.title_single_tag', { title: allPlaceCampaigns[0]?.title })}
      </Text>
    )
  }
  return (
    <Select
      width="auto"
      borderRadius="18px"
      backgroundColor="blue.100"
      color="blue.500"
      borderColor="transparent"
      value={router.query.campaign}
      onChange={(e) => {
        router.push({
          pathname: router.pathname,
          query: { campaign: e.target.value },
        })
      }}
    >
      {allPlaceCampaigns.map((campaign) => (
        <option key={campaign.id} value={campaign.id}>
          {campaign.title}
        </option>
      ))}
    </Select>
  )
}

export default CampaignSelectorField

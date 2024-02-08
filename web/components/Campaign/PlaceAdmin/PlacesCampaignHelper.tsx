import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Pin from 'public/assets/img/pin-helper.svg'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'

const PlacesCampaignHelper = () => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()

  if (
    !currentCampaign ||
    !['disponibilities', 'applications']?.includes(currentCampaign?.mode)
  ) {
    return null
  }

  return (
    <Box paddingY={4}>
      <HStack backgroundColor="grayBackground" paddingX={6} paddingY={4}>
        <Box>
          <Pin stroke="black" height="26px" width="26px" />
        </Box>
        <Text>
          <Text as="span" fontWeight="bold" marginRight={1}>
            {t(`campaign.helpers.${currentCampaign.mode}.title`, {
              title: currentCampaign?.title,
            })}
          </Text>
          {t(`campaign.helpers.${currentCampaign.mode}.description`, {
            date: format(currentCampaign?.limitDate, 'dd/MM/yyyy'),
          })}
        </Text>
      </HStack>
    </Box>
  )
}

export default PlacesCampaignHelper

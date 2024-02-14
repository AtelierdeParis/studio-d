import { Box, HStack, Text } from '@chakra-ui/react'
import Pin from 'public/assets/img/pin-helper.svg'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const PlacesAdminCampaignHelper = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const { currentCampaign } = useCampaignContext()

  if (
    !currentCampaign ||
    !['disponibilities', 'applications']?.includes(currentCampaign?.mode)
  ) {
    return null
  }

  return (
    <HStack
      backgroundColor="grayBackground"
      paddingX={6}
      paddingY={4}
      alignItems="flex-start"
    >
      <Box>
        <Pin stroke="black" height="26px" width="26px" />
      </Box>
      <Text>
        <Text as="span" fontWeight="bold" marginRight={1}>
          {title}
        </Text>
        {description}
      </Text>
    </HStack>
  )
}

export default PlacesAdminCampaignHelper

import React from 'react'
import {
  Text,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const Debug = () => {
  const { currentCampaign } = useCampaignContext()
  return (
    <Popover>
      <PopoverTrigger>
        <Box bg="white">CLICK ME</Box>
      </PopoverTrigger>
      <PopoverContent>
        <Text>campaignMode = {currentCampaign?.mode}</Text>
        <Text>limitDate = {currentCampaign?.limitDate}</Text>
        <Text>title = {currentCampaign?.title}</Text>
      </PopoverContent>
    </Popover>
  )
}

export default Debug

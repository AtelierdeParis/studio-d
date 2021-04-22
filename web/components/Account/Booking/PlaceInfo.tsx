import React from 'react'
import { Text, Flex } from '@chakra-ui/react'

const PlaceInfo = ({ label, value }) => {
  if (!value) return null
  return (
    <Flex flexWrap="wrap">
      <Text fontFamily="mabry medium" fontWeight="500" whiteSpace="nowrap">
        {label}
      </Text>
      <Text pl={1}>{value}</Text>
    </Flex>
  )
}

export default PlaceInfo

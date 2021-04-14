import React from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  text: string
  isAuthor: boolean
}

const getStyle = (isAuthor) => {
  if (isAuthor)
    return {
      bgColor: 'blue.500',
      color: 'white',
    }
  return {
    bgColor: 'blue.100',
  }
}

const Message = ({ text, isAuthor }: Props) => {
  return (
    <Box
      maxW="100%"
      borderRadius="sm"
      px={3}
      py={2}
      {...getStyle(isAuthor)}
      w="fit-content"
    >
      {text}
    </Box>
  )
}

export default Message

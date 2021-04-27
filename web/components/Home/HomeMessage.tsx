import React from 'react'
import { useHomeMessage } from '~hooks/useHomeMessage'
import { Flex, Text, Box, useBreakpointValue } from '@chakra-ui/react'
import Pin from 'public/assets/img/pin-home.svg'

const HomeMessage = () => {
  const style = useBreakpointValue({
    base: {
      py: 8,
      px: 8,
    },
    md: {
      px: 6,
      pt: 22,
      pb: 12,
      mb: '-35px',
    },
  })
  const { data: message } = useHomeMessage({
    isVisible: true,
  })
  if (!message) return null

  return (
    <Box bgColor="orange.100" {...style}>
      <Flex
        direction="column"
        maxW="700px"
        mx="auto"
        textAlign={{ md: 'center', base: 'left' }}
        w="100%"
      >
        <Flex
          fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
          fontFamily="mabry medium"
          fontWeight="500"
          justifyContent={{ base: 'flex-start', md: 'center' }}
          pb={4}
        >
          <Pin />
          <Text ml={4}>{message.title}</Text>
        </Flex>
        <Text>{message.text}</Text>
      </Flex>
    </Box>
  )
}

export default HomeMessage

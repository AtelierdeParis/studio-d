import React from 'react'
import { useHomeMessage } from '~hooks/useHomeMessage'
import { Flex, Text, Box } from '@chakra-ui/react'
import Pin from 'public/assets/img/pin-home.svg'

const HomeMessage = () => {
  const { data: message } = useHomeMessage({
    isVisible: true,
  })
  if (!message) return null

  return (
    <Box bgColor="orange.100" px={6} pt={22} pb={12} mb="-35px">
      <Flex
        direction="column"
        maxW="700px"
        mx="auto"
        textAlign="center"
        w="100%"
      >
        <Flex
          fontSize="2xl"
          fontFamily="mabry medium"
          fontWeight="500"
          justifyContent="center"
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

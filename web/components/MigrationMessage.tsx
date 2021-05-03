import React from 'react'
import { Flex, Text, Box, useBreakpointValue } from '@chakra-ui/react'
import Pin from 'public/assets/img/pin-home.svg'

const MigrationMessage = ({ title, message }) => {
  const style = useBreakpointValue({
    base: {
      py: 5,
      px: 4,
    },
    md: {
      px: 6,
      pt: 12,
      pb: 12,
    },
  })

  return (
    <Box bgColor="orange.100" mb="10" {...style}>
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
          <Box minW="30px">
            <Pin />
          </Box>
          <Text ml={4}>{title}</Text>
        </Flex>
        <Text
          lineHeight="1.6"
          color="grayText.1"
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          {message}
        </Text>
      </Flex>
    </Box>
  )
}

export default MigrationMessage

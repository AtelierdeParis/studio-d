import React from 'react'
import { Flex, Image } from '@chakra-ui/react'

const FallbackImage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100%"
      w="100%"
      bgColor="gray.100"
      p={1.5}
    >
      <Image src="/assets/img/logo-studio-d-white.svg" />
    </Flex>
  )
}

export default FallbackImage

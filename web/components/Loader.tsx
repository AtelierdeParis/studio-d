import { Center, Text, Spinner, Flex, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface ILoader extends BoxProps {
  text?: string
  isCentered?: boolean
  size?: string
}
const Loader = ({ text, isCentered, size = 'xl', ...rest }: ILoader) => {
  return (
    <Center
      height={isCentered && '100%'}
      justifyContent="center"
      alignItems="center"
      w="100%"
      position={isCentered ? 'absolute' : 'initial'}
      left="0"
      top="0"
      {...rest}
    >
      <Flex direction="column" alignItems="center">
        {text && (
          <Text p={4} color="gray.700">
            {text}
          </Text>
        )}
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size={size}
        />
      </Flex>
    </Center>
  )
}

export default Loader

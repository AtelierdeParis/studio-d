import React from 'react'
import { Box, Text, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  children: React.ReactNode
  message?: string
}

const NotComplete = ({ message = '', children, ...rest }: Props) => {
  return (
    <Box
      px={6}
      py={3}
      bgColor="orange.500"
      color="white"
      pos="relative"
      mt="4"
      {...rest}
    >
      <Box
        pos="absolute"
        bottom="100%"
        w="0"
        h="0"
        borderStyle="solid"
        borderWidth="0 10px 10px 10px"
        borderColor="transparent transparent #e84e10 transparent"
      />
      <Text>{children}</Text>
      {message !== '' && message !== 'Champs requis' && message}
    </Box>
  )
}

export default NotComplete

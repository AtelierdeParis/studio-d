import React from 'react'
import { Square, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  nb: number
}

const Notif = ({ nb, ...rest }: Props) => {
  return (
    <Square
      bgColor="orange.500"
      borderRadius="sm"
      color="white"
      h="18px"
      px={0.5}
      minW="18px"
      lineHeight="18px"
      fontSize="sm"
      {...rest}
    >
      {nb}
    </Square>
  )
}

export default Notif

import React from 'react'
import { BoxProps, Circle as ChakraCircle } from '@chakra-ui/react'

interface Props extends BoxProps {
  status:
    | 'booked'
    | 'available'
    | 'accepted'
    | 'askcancel'
    | 'pending'
    | 'past'
    | 'canceled'
    | 'canceledbyplace'
    | 'occupied'
}

const Circle = ({ bgColor, ...rest }) => {
  return <ChakraCircle bgColor={bgColor} size="14px" {...rest} />
}

const Tag = ({ status, ...rest }: Props) => {
  switch (status) {
    case 'booked':
    case 'available':
    case 'accepted':
    case 'askcancel':
      return <Circle bgColor="tag.green" {...rest} />
    case 'pending':
      return <Circle bgColor="tag.yellow" {...rest} />
    case 'past':
      return <Circle bgColor="tag.gray" {...rest} />
    case 'canceled':
    case 'canceledbyplace':
      return <Circle bgColor="tag.red" {...rest} />
    case 'occupied':
      return <Circle bgColor="tag.green" {...rest} />
  }
}

export default Tag

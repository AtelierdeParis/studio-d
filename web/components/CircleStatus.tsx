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
    | 'requestcanceled'
    | 'requestcanceledbyplace'
    | 'bookingcanceledbyplace'
    | 'occupied'
    | 'expired'
}

const Circle = ({ bgColor, ...rest }) => {
  return <ChakraCircle bgColor={bgColor} size="14px" {...rest} />
}

const Tag = ({ status, ...rest }: Props) => {
  switch (status) {
    case 'booked':
    case 'available':
    case 'accepted':
      return <Circle bgColor="tag.green" {...rest} />
    case 'pending':
    case 'askcancel':
      return <Circle bgColor="tag.yellow" {...rest} />
    case 'past':
    case 'expired':
      return <Circle bgColor="tag.gray" {...rest} />
    case 'requestcanceled':
    case 'requestcanceledbyplace':
    case 'bookingcanceledbyplace':
      return <Circle bgColor="tag.red" {...rest} />
    case 'occupied':
      return <Circle bgColor="tag.green" {...rest} />
  }
}

export default Tag

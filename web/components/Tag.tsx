import React from 'react'
import { Tag as ChakraTag, TagProps, Circle, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface Props extends TagProps {
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
  children?: React.ReactNode
}

const Tag = ({ status, children, ...rest }: Props) => {
  const { t } = useTranslation('account')
  switch (status) {
    case 'booked':
    case 'available':
    case 'accepted':
    case 'askcancel':
      return (
        <ChakraTag bgColor="tag.green" {...rest}>
          {children || t('tag.booked')}
        </ChakraTag>
      )
    case 'pending':
      return (
        <ChakraTag bgColor="tag.yellow" {...rest}>
          {children || t('tag.pending')}
        </ChakraTag>
      )
    case 'past':
      return (
        <ChakraTag bgColor="tag.gray" {...rest}>
          {children || t('tag.past')}
        </ChakraTag>
      )
    case 'requestcanceled':
    case 'requestcanceledbyplace':
    case 'bookingcanceledbyplace':
      return (
        <ChakraTag bgColor="tag.red" {...rest}>
          {children || t('tag.canceled')}
        </ChakraTag>
      )
    case 'occupied':
      return (
        <ChakraTag bgColor="tag.green">
          <Circle size="6px" bgColor="green.500" ml={1} />
          <Text ml={2}>{children || t('tag.occupied')}</Text>
        </ChakraTag>
      )
  }
}

export default Tag

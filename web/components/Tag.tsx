import React from 'react'
import { Tag as ChakraTag, TagProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { DisponibilityStatus } from '~@types/disponibility'

interface ITag extends TagProps {
  status: DisponibilityStatus
  children?: React.ReactNode
}

const Tag = ({ status, children, ...rest }: ITag) => {
  const { t } = useTranslation('account')
  switch (status) {
    case 'booked':
    case 'available':
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
    default:
      return null
  }
}

export default Tag

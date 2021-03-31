import React from 'react'
import { Tag as ChakraTag } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Tag = ({ status }) => {
  const { t } = useTranslation('account')
  switch (status) {
    case 'booked':
      return <ChakraTag bgColor="tag.green">{t('tag.booked')}</ChakraTag>
    case 'pending':
      return <ChakraTag bgColor="tag.yellow">{t('tag.pending')}</ChakraTag>
    default:
      return null
  }
}

export default Tag

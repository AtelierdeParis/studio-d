import React from 'react'
import { Flex, Spacer, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const PlaceFormBar = ({ children = null, isNotAvailable = false }) => {
  const { t } = useTranslation('place')
  return (
    <Flex
      left="0"
      right="0"
      pos="fixed"
      bottom="0"
      justifyContent="space-between"
      alignItems="center"
      pr={4}
      py={2.5}
      borderTop="1px solid"
      borderColor="gray.100"
      bgColor="white"
      zIndex={998}
      pl={{ base: 4, md: '16.7rem' }}
    >
      {isNotAvailable ? (
        <Text color="red.500" pr={4} fontSize={{ base: 'sm', md: 'md' }}>
          {t('notAvailable')}
        </Text>
      ) : (
        <Spacer />
      )}
      {children}
    </Flex>
  )
}

export default PlaceFormBar

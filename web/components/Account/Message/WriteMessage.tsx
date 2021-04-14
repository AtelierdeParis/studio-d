import React from 'react'
import { Box, Button, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const WriteMessage = () => {
  const { t } = useTranslation('booking')
  return (
    <Box borderTop="1px solid" borderColor="gray.100" p={5}>
      <Textarea h="150px" resize="none" placeholder={t('messages.write')} />
      <Flex justifyContent="flex-end" pt={5}>
        <Button>{t('messages.submit')}</Button>
      </Flex>
    </Box>
  )
}

export default WriteMessage

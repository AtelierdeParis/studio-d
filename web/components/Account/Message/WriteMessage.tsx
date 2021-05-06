import React, { useState } from 'react'
import { Box, Button, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const WriteMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('booking')

  const onSubmit = () => {
    setLoading(true)
    sendMessage(message)
      .then(() => {
        setMessage('')
      })
      .finally(() => setLoading(false))
  }

  return (
    <Box borderTop="1px solid" borderColor="gray.100" p={5} flex={0}>
      <Textarea
        h="150px"
        resize="none"
        placeholder={t('messages.write')}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Flex justifyContent="flex-end" pt={5}>
        <Button isLoading={isLoading} onClick={onSubmit}>
          {t('messages.submit')}
        </Button>
      </Flex>
    </Box>
  )
}

export default WriteMessage

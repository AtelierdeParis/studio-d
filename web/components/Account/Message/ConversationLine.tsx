import React, { useMemo } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { format } from '~utils/date'
import Message from '~components/Account/Message/Message'
import HistoryLine from '~components/Account/Message/HistoryLine'

const ConversationLine = ({ message, hideDate, isAuthor, type }) => {
  const name = useMemo(
    () =>
      message.author === 'company'
        ? message.company.structureName
        : message.place.structureName,
    [message],
  )

  return (
    <Flex
      alignItems={isAuthor ? 'flex-end' : 'flex-start'}
      alignSelf={isAuthor ? 'flex-end' : 'flex-start'}
      direction="column"
      w="100%"
      maxW="420px"
    >
      {!hideDate && (
        <Flex fontSize="sm" color="gray.300" pb={2}>
          {!isAuthor && (
            <Text isTruncated maxW="300px" pr={1}>
              {`${name}, `}
            </Text>
          )}
          <Text>{format(message.created_at, "dd/MM à H'h'mm")}</Text>
        </Flex>
      )}
      {message.status === 'message' ? (
        <Message isAuthor={isAuthor} text={message.message} />
      ) : (
        <HistoryLine message={message} isAuthor={isAuthor} type={type} />
      )}
    </Flex>
  )
}

export default ConversationLine

import React, { useMemo } from 'react'
import { Message as IMessage } from '~typings/api'
import { format } from '~utils/date'
import { Text, Box, Flex } from '@chakra-ui/react'

interface Props {
  message: IMessage
  isAuthor: boolean
}

const getStyle = (isAuthor) => {
  if (isAuthor)
    return {
      bgColor: 'blue.500',
      color: 'white',
    }
  return {
    bgColor: 'blue.100',
  }
}

const Message = ({ message, isAuthor }: Props) => {
  const name = useMemo(
    () =>
      message.author === 'company'
        ? message.place.structureName
        : message.company.structureName,
    [message],
  )

  return (
    <Flex
      alignItems={isAuthor ? 'flex-end' : 'flex-start'}
      direction="column"
      w="100%"
    >
      <Flex fontSize="sm" color="gray.300" pb={2}>
        <Text isTruncated maxW="300px">
          {!isAuthor && `${name}, `}
        </Text>
        <Text>{format(message.created_at, "dd/MM à H'h'm")}</Text>
      </Flex>
      <Box
        borderRadius="sm"
        px={3}
        py={2}
        {...getStyle(isAuthor)}
        maxW="420px"
        w="fit-content"
      >
        {message.message}
      </Box>
    </Flex>
  )
}

export default Message

import React from 'react'
import { getHistoryInfo } from '~utils/message'
import { Message } from '~typings/api'
import { Flex, Circle, Text } from '@chakra-ui/react'

interface Props {
  message: Message
  isAuthor: boolean
  type: 'company' | 'place'
}

const HistoryLine = ({ message, isAuthor, type }: Props) => {
  const { color, text, colorCircle } = getHistoryInfo(
    message.status,
    message.booking,
    type,
  )

  return (
    <Flex
      w="100%"
      alignItems="flex-start"
      justifyContent={isAuthor ? 'flex-end' : 'flex-start'}
    >
      {!isAuthor && <Circle size="6px" bgColor={colorCircle} mt={1.5} mr={2} />}

      <Text fontSize="sm" color={color} textAlign={isAuthor ? 'right' : 'left'}>
        {text}
      </Text>

      {isAuthor && <Circle size="6px" bgColor={colorCircle} mt={2} ml={2} />}
    </Flex>
  )
}

export default HistoryLine

import React from 'react'
import { Box, Flex, VStack } from '@chakra-ui/react'
import { useConversation } from '~hooks/useConversation'
import Message from '~components/Account/Message/Message'
import WriteMessage from '~components/Account/Message/WriteMessage'
import Loading from '~components/Loading'
import { UsersPermissionsUser } from '~typings/api'

interface Props {
  id: string
  user: UsersPermissionsUser
}

const Conversation = ({ id, user }: Props) => {
  const { data: conversation, isLoading } = useConversation(id)

  if (!isLoading && !conversation) return null

  return (
    <Loading isLoading={isLoading} h="100%">
      <Flex
        direction="column"
        justifyContent="space-between"
        flex={1}
        h="100vh"
        overflow="hidden"
      >
        <VStack spacing={6} alignItems="flex-start" p={5} overflow="auto">
          {conversation &&
            conversation.map((message) => (
              <Message
                key={message.id}
                message={message}
                isAuthor={user.type === message.author}
              />
            ))}
        </VStack>

        <WriteMessage />
      </Flex>
    </Loading>
  )
}

export default Conversation

import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import { useConversation } from '~hooks/useConversation'
import WriteMessage from '~components/Account/Message/WriteMessage'
import Loading from '~components/Loading'
import Loader from '~components/Loader'
import { UsersPermissionsUser } from '~typings/api'
import ConversationLine from '~components/Account/Message/ConversationLine'
import { client } from '~api/client-api'
import { useQueryClient } from 'react-query'
import RightAsideMessage from '~components/Account/Message/RightAsideMessage'
import { useBookings } from '~hooks/useBookings'
interface Props {
  id: string
  user: UsersPermissionsUser
}

const Conversation = ({ id, user }: Props) => {
  const listRef = useRef(null)
  const [hasScrolled, setScrolled] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: conversation,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useConversation(id, {
    onSuccess: () => {
      client.notifications
        .toggleNotif({ status: 'message', targetId: id })
        .then(() => {
          queryClient.setQueryData(['myNotifications', { id }], {
            request: 0,
            message: 0,
            booking: 0,
          })
        })
    },
  })

  const { data: bookings } = useBookings({
    _sort: 'id:desc',
    ...(user.type === 'place'
      ? {
          place: user.id,
          company: id,
        }
      : {
          place: id,
          company: user.id,
        }),
  })

  useEffect(() => {
    if (listRef.current && !hasScrolled) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight)
      setScrolled(true)
    }
  }, [listRef?.current, isLoading, hasScrolled])

  if (!isLoading && !conversation) return null

  const sendMessage = (message) => {
    if (bookings.length === 0) return false
    const target =
      user.type === 'place'
        ? { company: bookings[0].company }
        : { place: bookings[0].place }

    return (
      client.messages
        // @ts-ignore
        .messagesCreate({
          status: 'message',
          message,
          booking: bookings[0].id,
          ...target,
        })
        .then((res) => {
          const newArray = [...conversation.pages]
          newArray[0].unshift(res.data)
          setScrolled(false)
          queryClient.refetchQueries(['conversation', id])
        })
    )
  }

  return (
    <Loading isLoading={isLoading} h="100%" flex={1}>
      <Flex flex={1} direction="column">
        <Flex
          direction="column"
          justifyContent="space-between"
          flex={1}
          h="100vh"
          overflow="hidden"
        >
          <VStack
            spacing={5}
            alignItems="flex-start"
            p={5}
            overflow="auto"
            ref={listRef}
            onScroll={() => {
              if (listRef.current.scrollTop === 0) {
                const positionBeforeElement =
                  listRef.current.scrollHeight - listRef.current.offsetHeight
                fetchNextPage().then(() => {
                  const newPosition =
                    listRef.current.scrollHeight - listRef.current.offsetHeight
                  listRef.current.scrollTo(
                    0,
                    newPosition - positionBeforeElement,
                  )
                })
              }
            }}
          >
            {isFetching && hasNextPage && <Loader pos="absolute" top="20px" />}
            {conversation &&
              conversation.pages
                .flat()
                .reverse()
                .map((message, index, array) => (
                  <ConversationLine
                    key={message.id}
                    message={message}
                    isAuthor={user.type === message.author}
                    type={user.type}
                    hideDate={
                      array[index - 1] &&
                      array[index - 1].author === message.author
                    }
                  />
                ))}
          </VStack>
          <WriteMessage sendMessage={sendMessage} />
        </Flex>
      </Flex>
      <RightAsideMessage bookings={bookings} user={user} />
    </Loading>
  )
}

export default Conversation
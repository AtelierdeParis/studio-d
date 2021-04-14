import React, { useState } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoMessage from '~components/Account/Info/InfoMessage'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import { useMyConversations } from '~hooks/useMyConversations'
import ListConversations from '~components/Account/Message/ListConversations'
import Conversation from '~components/Account/Message/Conversation'
import { Flex, Box } from '@chakra-ui/react'

interface Props {
  user: UsersPermissionsUser
}

const AccountMessage = ({ user }: Props) => {
  const [selected, setSelected] = useState(null)
  const { data: conversations, isLoading } = useMyConversations()

  if (!conversations || conversations?.length === 0) return <InfoMessage />

  return (
    <Flex h="100%">
      <ListConversations
        conversations={conversations}
        setSelected={setSelected}
        selected={selected}
      />
      <Flex flex={1} direction="column">
        {selected && <Conversation id={selected} user={user} />}
      </Flex>
      <Box borderLeft="1px solid" borderColor="gray.100" w="420px"></Box>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = requireAuth(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account', 'booking'])),
      },
    }
  },
)

export default AccountMessage

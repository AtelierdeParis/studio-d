import React, { useState, useEffect } from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InfoMessage from '~components/Account/Info/InfoMessage'
import { UsersPermissionsUser } from '~typings/api'
import { requireAuth } from '~utils/auth'
import { useMyConversations } from '~hooks/useMyConversations'
import ListConversations from '~components/Account/Message/ListConversations'
import Loading from '~components/Loading'
import Conversation from '~components/Account/Message/Conversation'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ROUTE_ACCOUNT_MESSAGE } from '~constants'
import { useContextualRouting } from 'next-use-contextual-routing'

interface Props {
  user: UsersPermissionsUser
}

const AccountMessage = ({ user }: Props) => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const [selected, setSelected] = useState(
    (router?.query?.conversation as string) || null,
  )
  const { data: conversations, isLoading } = useMyConversations()

  useEffect(() => {
    if (
      selected &&
      conversations &&
      !conversations.some((conv) => conv.id.toString() === selected.toString())
    ) {
      setSelected(null)
    }
    router.push(
      makeContextualHref({ id: selected }),
      `${ROUTE_ACCOUNT_MESSAGE}${selected ? `/${selected}` : ''}`,
      {
        shallow: true,
      },
    )
  }, [selected, conversations])

  if ((!isLoading && !conversations) || conversations?.length === 0)
    return <InfoMessage />

  return (
    <Flex h="100%">
      <Loading isLoading={isLoading}>
        <ListConversations
          conversations={conversations}
          setSelected={setSelected}
          selected={selected}
        />
        {selected && <Conversation id={selected} user={user} />}
      </Loading>
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

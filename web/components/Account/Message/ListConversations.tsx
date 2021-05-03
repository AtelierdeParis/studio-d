import React from 'react'
import { UsersPermissionsUser } from '~typings/api'
import { Avatar, Flex, VStack, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useMyNotifications } from '~hooks/useMyNotifications'
import Notif from '~components/Notif'

const Item = ({ id, name, isSelected, setSelected }) => {
  const { data: notifs } = useMyNotifications({ id })

  return (
    <Flex
      alignItems="center"
      py={2.5}
      pl={5}
      pr={3}
      _hover={{
        backgroundColor: 'blue.100',
      }}
      {...(isSelected && {
        backgroundColor: 'blue.100',
        color: 'blue.500',
      })}
      w="100%"
      cursor="pointer"
      onClick={() => {
        setSelected(isSelected ? null : id)
      }}
      justifyContent="space-between"
    >
      <Avatar
        name={name}
        bgColor="gray.300"
        color="white"
        width="20px"
        height="20px"
        fontSize="14px"
        size="sm"
      />
      <Flex alignItems="center" flex={1}>
        <Text
          pl={4}
          lineHeight={1}
          color="grayText.1"
          isTruncated
          flex={1}
          maxW={{ base: '100%', md: '120px', lg: '160px' }}
          mr={2}
        >
          {name}
        </Text>
        {notifs && notifs.message > 0 && <Notif nb={notifs.message} />}
      </Flex>
    </Flex>
  )
}
interface Props {
  conversations: UsersPermissionsUser[]
  selected: string
  setSelected: (id: string) => void
}

const ListConversations = ({ conversations, selected, setSelected }: Props) => {
  const { t } = useTranslation('booking')

  return (
    <Box
      py={5}
      w={{ base: '100%', md: '180px', lg: '240px' }}
      borderRight="1px solid"
      borderColor="gray.100"
      display={{ base: selected ? 'none' : 'block', md: 'block' }}
      h="100%"
    >
      <Text
        fontFamily="mabry medium"
        fontWeight="500"
        textTransform="uppercase"
        fontSize="sm"
        mb={{ base: 4, sm: 8 }}
        pl={5}
      >
        {t('messages.title')}
      </Text>
      <VStack alignItems="flex-start" spacing={0}>
        {conversations.map((user) => (
          <Item
            key={user.id}
            id={user.id}
            name={user.structureName}
            isSelected={selected?.toString() === user?.id?.toString()}
            setSelected={setSelected}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default ListConversations

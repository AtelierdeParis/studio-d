import React from 'react'
import { UsersPermissionsUser } from '~typings/api'
import { Avatar, Flex, VStack, Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const Item = ({ id, name, isSelected, setSelected }) => {
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
      onClick={() => setSelected(isSelected ? null : id)}
    >
      <Avatar
        name={name[0]}
        bgColor="gray.300"
        color="white"
        width="20px"
        height="20px"
        fontSize="14px"
        size="sm"
      />
      <Text pl={4} lineHeight={1} color="grayText.1" isTruncated>
        {name}
      </Text>
      {/* TODO: handle notif */}
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
      w="240px"
      borderRight="1px solid"
      borderColor="gray.100"
      h="100%"
    >
      <Text
        fontFamily="mabry medium"
        fontWeight="500"
        textTransform="uppercase"
        fontSize="sm"
        mb={8}
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
            isSelected={selected === user.id}
            setSelected={setSelected}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default ListConversations

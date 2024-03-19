import { Divider, VStack } from '@chakra-ui/react'

const NoContent = () => {
  return (
    <VStack
      width="100%"
      height="100%"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Divider w="10px" borderColor="black" />
    </VStack>
  )
}

export default NoContent

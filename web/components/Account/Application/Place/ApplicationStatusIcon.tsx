import { Box, Flex } from '@chakra-ui/react'
import { Application } from '~typings/api'

const ApplicationStatusIcon = ({
  status,
}: {
  status: Application['status']
}) => {
  if (status)
    return (
      <Flex
        backgroundColor={status === 'confirmed' ? '#6EAE7F' : '#E84E10'}
        borderRadius="50%"
        color="white"
        width="20px"
        minW="20px"
        height="20px"
        fontSize="12px"
        justifyContent="center"
        alignItems="center"
        paddingX={1}
      >
        ✓
      </Flex>
    )

  return null
}

export default ApplicationStatusIcon

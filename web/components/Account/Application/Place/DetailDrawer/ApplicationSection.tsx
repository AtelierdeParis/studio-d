import { Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react-markdown'

const ApplicationSection = ({
  label,
  children,
}: {
  label: ReactNode
  children: ReactNode
}) => (
  <VStack width="100%" alignItems="flex-start" spacing={1}>
    <Text fontWeight="semibold">{label}</Text>
    <Text> {children}</Text>
  </VStack>
)

export default ApplicationSection

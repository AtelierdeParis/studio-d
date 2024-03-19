import { Divider, Heading, Text, VStack } from '@chakra-ui/react'

const ApplicationFormTitle = ({
  title,
  position,
  helper,
  spacing = 4,
}: {
  title: string
  position: string
  helper?: string
  spacing?: number
}) => {
  return (
    <VStack spacing={6} width="100%">
      <Heading as="h2" textStyle="h2" textAlign="center" width="100%">
        <Text fontFamily="mabry" textAlign="left">
          <Text color="blue.700" as="span">
            {position}
          </Text>
          <Text as="span" paddingLeft={2}>
            {title}
          </Text>
          {helper && (
            <Text as="span" color="gray.200" paddingLeft={2}>
              {helper}
            </Text>
          )}
        </Text>
      </Heading>

      <Divider opacity="0.3" />
    </VStack>
  )
}

export default ApplicationFormTitle

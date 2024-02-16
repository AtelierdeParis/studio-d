import { Divider, Heading, HStack, Text } from '@chakra-ui/react'

const ApplicationFormTitle = ({
  title,
  position,
  helper,
}: {
  title: string
  position: string
  helper?: string
}) => {
  return (
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
      <Divider opacity="0.3" marginTop={2} />
    </Heading>
  )
}

export default ApplicationFormTitle

import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const ApplicationReferenceItem = ({ title }: { title: string }) => {
  const { t } = useTranslation('place')
  return (
    <Box padding={4} borderColor="blue.500">
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Text>{title}</Text>
        <HStack>
          <Button variant="outline" colorScheme="blue">
            {t('campaignApplication.references.edit')}
          </Button>
          <Button variant="outline" colorScheme="blue">
            {t('campaignApplication.references.delete')}
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export default ApplicationReferenceItem

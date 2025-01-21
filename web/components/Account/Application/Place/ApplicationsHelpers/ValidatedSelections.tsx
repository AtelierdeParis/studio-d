import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import PreselectionsValidated from 'public/assets/img/preselectionsValidated.svg'

const ValidatedSelections = () => {
  const { t } = useTranslation('application')

  return (
    <Box paddingY={2}>
      <HStack
        backgroundColor="rgba(110, 174, 127,0.1)"
        borderRadius="4px"
        p={4}
      >
        <PreselectionsValidated />
        <Text as="span" color="green.600" pl={1}>
          {t('place.helper.validated')}
        </Text>
      </HStack>
    </Box>
  )
}

export default ValidatedSelections

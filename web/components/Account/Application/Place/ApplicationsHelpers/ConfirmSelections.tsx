import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import PreselectionsWarning from 'public/assets/img/preselectionsWarning.svg'
import { useTranslation } from 'next-i18next'

const ConfirmSelections = ({ preselections }: { preselections: number }) => {
  const { t } = useTranslation('application')

  return (
    <Box paddingY={2}>
      <Stack
        background="orange.100"
        borderRadius="4px"
        p={4}
        direction={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <HStack>
          <PreselectionsWarning />
          <Text as="span" color="orange.600" pl={1}>
            {t(
              `place.helper.confirm_preselection${
                preselections > 1 ? 's' : ''
              }`,
              {
                num: preselections,
              },
            )}
          </Text>
        </HStack>
        <Button
          whiteSpace="normal"
          textAlign="center"
          lineHeight="inherit"
          height="auto!important"
          size="xl"
          p={2}
        >
          {t('place.helper.confirm_cta')}
        </Button>
      </Stack>
    </Box>
  )
}

export default ConfirmSelections

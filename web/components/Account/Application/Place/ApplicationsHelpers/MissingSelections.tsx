import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { format } from '~utils/date'
import PreselectionsWarning from 'public/assets/img/preselectionsWarning.svg'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const MissingSelections = ({
  missingPreselections,
}: {
  missingPreselections: number
}) => {
  const { t } = useTranslation('application')
  const { selectedCampaign } = useSelectedCampaign()

  return (
    <Box paddingY={2}>
      <HStack background="orange.100" borderRadius="4px" p={4}>
        <HStack justifyContent="center">
          <PreselectionsWarning />
          <Box color="orange.600" pl={1}>
            <Text as="span">
              {t('place.helper.preselection_start', {
                date: format(selectedCampaign?.preselection_end),
              })}
            </Text>
            <Text as="span" fontWeight="bold" pl={1}>
              {t(
                `place.helper.missing_preselection${
                  missingPreselections > 0 ? 's' : ''
                }`,
                { num: missingPreselections },
              )}
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Box>
  )
}

export default MissingSelections

import { Box, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { format } from '~utils/date'
import PreselectionsWarning from 'public/assets/img/preselectionsWarning.svg'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

const MissingSelections = () => {
  const { t } = useTranslation('application')
  const { selectedCampaign } = useSelectedCampaign()

  return (
    <Box paddingY={2}>
      <HStack background="orange.100" borderRadius="4px" p={4}>
        <HStack justifyContent="center">
          <PreselectionsWarning />
          <Box color="orange.600" pl={1}>
            <Text>
              {t(
                `place.helper.no_preselection.${
                  selectedCampaign?.applications_max > 1 ? 'plural' : 'singular'
                }`,
                {
                  preselection_end_date: format(
                    selectedCampaign?.preselection_end,
                  ),
                  applications_max: selectedCampaign?.applications_max,
                },
              )}
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Box>
  )
}

export default MissingSelections

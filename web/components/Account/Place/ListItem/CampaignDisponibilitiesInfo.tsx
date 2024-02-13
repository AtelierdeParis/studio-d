import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Espace } from '~typings/api'
import { format } from '~utils/date'

const CampaignDisponibilitiesInfo = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const campaignDispo = place?.disponibilities?.filter(
    //@ts-expect-error
    (d) => d.campaign === currentCampaign?.id,
  )?.length

  return (
    <VStack>
      <HStack borderBottom="1px solid" borderColor={'gray.100'} width="100%">
        <Box
          width="auto"
          border="1px solid"
          borderBottom="none"
          borderColor={'gray.100'}
          paddingX={6}
          paddingY={2}
        >
          <Text>{t('list.campaign_slots')}</Text>
        </Box>
      </HStack>

      <HStack width={'100%'}>
        <Box flex={1}>
          <Text color="gray.500">{t('list.campaign_slots')}</Text>
        </Box>

        <Box flex={2}>
          <Text>
            {`${t(`list.slots_filled`, {
              nb: campaignDispo,
              nbTotal: currentCampaign?.disponibilities_max,
            })}`}
          </Text>
          <Text color="gray.500">
            {t('list.fill_before', {
              date: format(new Date(currentCampaign?.limitDate)),
            })}
          </Text>
        </Box>
      </HStack>
    </VStack>
  )
}

export default CampaignDisponibilitiesInfo

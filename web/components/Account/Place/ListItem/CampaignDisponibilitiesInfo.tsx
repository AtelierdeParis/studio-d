import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import Link from '~components/Link'

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
          <Text
            as={Link}
            href={{
              pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
              query: { id: place.slug, index: 3 },
            }}
          >
            {t('list.campaign_slots', { title: currentCampaign?.title })}
          </Text>
        </Box>
      </HStack>

      <HStack width={'100%'} paddingLeft={{ base: 0, md: 6 }}>
        <Box
          flex={1}
          as={Link}
          href={{
            pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
            query: { id: place.slug, index: 3 },
          }}
        >
          <Text color="gray.500">{t('list.campaign_slots')}</Text>
        </Box>

        <Box flex={2}>
          <Text>
            {`${t(`list.slots_filled`, {
              nb: campaignDispo,
              nbTotal: currentCampaign?.disponibilities_max,
            })}`}
          </Text>
          {currentCampaign?.mode === 'disponibilities' && (
            <Text color="gray.500">
              {t('list.fill_before', {
                date: format(new Date(currentCampaign?.disponibility_end)),
              })}
            </Text>
          )}
        </Box>
      </HStack>
    </VStack>
  )
}

export default CampaignDisponibilitiesInfo

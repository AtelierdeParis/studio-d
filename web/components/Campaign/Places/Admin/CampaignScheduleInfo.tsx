import React, { useContext } from 'react'
import {
  Flex,
  Box,
  Text,
  Button,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import ScheduleDelete from '~components/Account/Place/ScheduleDelete'
import Link from 'next/link'

interface Props {
  place: Espace
  showForm: () => void
}

const CampaignScheduleInfo = ({ place, showForm }: Props) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const campaignDispo = place?.disponibilities?.filter(
    //@ts-expect-error
    (d) => d.campaign === currentCampaign?.id,
  )?.length
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const { eventsIdToDelete } = useContext(ScheduleContext)

  if (eventsIdToDelete.length > 0) {
    return <ScheduleDelete />
  }

  return (
    <VStack spacing={4}>
      <PlacesAdminCampaignHelper
        title={t(`campaign.helpers.${currentCampaign?.mode}.schedule.title`, {
          disponibility_end: format(
            currentCampaign?.disponibility_end,
            'dd MMMM',
          ),
        })}
        description={t(
          `campaign.helpers.${currentCampaign?.mode}.schedule.description`,
          {
            ...currentCampaign,
            campaign_start: format(currentCampaign?.campaign_start, 'dd MMMM'),
            campaign_end: format(currentCampaign?.campaign_end, 'dd MMMM yyyy'),
          },
        )}
      />

      <Box width="100%">
        <Text fontFamily="mabry medium" fontSize="3xl" lineHeight="1">
          {currentCampaign?.mode === 'disponibilities'
            ? `${campaignDispo}/${currentCampaign?.disponibilities_max}`
            : campaignDispo}
        </Text>
        <Text>
          {currentCampaign?.mode === 'disponibilities'
            ? t(
                `campaign.helpers.disponibilities.schedule.open_disponibilities`,
              )
            : t(
                `campaign.helpers.applications.schedule.${
                  campaignDispo <= 1
                    ? 'open_applications_one'
                    : 'open_applications_many'
                }`,
              )}
        </Text>
      </Box>
      {currentCampaign?.mode === 'disponibilities' ? (
        <Button
          size="lg"
          alignSelf="flex-start"
          mt={6}
          onClick={showForm}
          disabled={campaignDispo === currentCampaign?.disponibilities_max}
        >
          {isMobile ? t(`list.add`) : t(`schedule.add`)}
        </Button>
      ) : (
        <Button
          size="lg"
          alignSelf="flex-start"
          mt={6}
          variant="outline"
          colorScheme="blue"
        >
          {t('campaign.helpers.applications.schedule.see_applications')}
        </Button>
      )}
    </VStack>
  )
}

export default CampaignScheduleInfo

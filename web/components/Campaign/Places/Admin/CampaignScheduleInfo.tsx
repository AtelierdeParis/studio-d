import React, { useContext } from 'react'
import { Box, Text, Button, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import PlacesAdminCampaignHelper from '~components/Campaign/Places/Admin/PlacesAdminCampaignHelper'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import { format } from '~utils/date'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import ScheduleDelete from '~components/Account/Place/ScheduleDelete'
import Link from '~components/Link'
import { ROUTE_ACCOUNT_APPLICATIONS } from '~constants'
import useCampaignDispo from '~hooks/useCampaignDispo'
import Schedule from '~components/Account/Place/Schedule'

interface Props {
  place: Espace
  showForm: () => void
}

const CampaignScheduleInfo = ({ place, showForm }: Props) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const { campaignDisposNum, campaignDispos } = useCampaignDispo(
    place?.disponibilities,
  )

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const { eventsIdToDelete } = useContext(ScheduleContext)

  if (eventsIdToDelete.length > 0) {
    return <ScheduleDelete isCampaignTab />
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
            ? `${campaignDisposNum}/${currentCampaign?.disponibilities_max}`
            : campaignDisposNum}
        </Text>
        <Text>
          {currentCampaign?.mode === 'disponibilities'
            ? t(
                `campaign.helpers.disponibilities.schedule.${
                  currentCampaign?.disponibilities_max === 1
                    ? 'open_disponibility'
                    : 'open_disponibilities'
                }`,
                { title: currentCampaign?.title },
              )
            : t(
                `campaign.helpers.applications.schedule.${
                  campaignDisposNum <= 1
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
          disabled={
            currentCampaign &&
            campaignDisposNum === currentCampaign?.disponibilities_max
          }
        >
          {isMobile ? t(`list.add`) : t(`schedule.add`)}
        </Button>
      ) : campaignDisposNum > 0 ? (
        <Button
          size="lg"
          alignSelf="flex-start"
          mt={6}
          variant="outline"
          colorScheme="blue"
          as={Link}
          href={`${ROUTE_ACCOUNT_APPLICATIONS}?campaign=${currentCampaign?.id}&espace=${place.id}&disponibility=${campaignDispos[0]?.id}`}
        >
          {t('campaign.helpers.applications.schedule.see_applications')}
        </Button>
      ) : null}
      <Box display={{ base: 'block', lg: 'none' }} width="100%">
        <Schedule isCampaignMode />
      </Box>
    </VStack>
  )
}

export default CampaignScheduleInfo

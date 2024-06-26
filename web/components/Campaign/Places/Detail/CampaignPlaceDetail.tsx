import {
  AspectRatio,
  Box,
  Container,
  Stack,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import CampaignApplicationSchedule from '~components/Campaign/Places/Application/CampaignApplicationSchedule'
import CampaignDetailSwitcher from '~components/Campaign/Places/Detail/CampaignDetailSwitcher'
import CampaignDetailTabs from '~components/Campaign/Places/Detail/CampaignDetailTabs'
import CampaignPlaceFiles from '~components/Campaign/Places/Detail/CampaignPlaceFiles'
import PlaceAttributesGridMobile from '~components/Place/PlaceAttributesGridMobile'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import PlaceDetailCalendar from '~components/Place/PlaceDetailPage/PlaceDetailCalendar'
import PlaceDetailExtraInfo from '~components/Place/PlaceDetailPage/PlaceDetailExtraInfo'
import PlaceDetailLocation from '~components/Place/PlaceDetailPage/PlaceDetailLocation'
import PlaceDetailMainInfo from '~components/Place/PlaceDetailPage/PlaceDetailMainInfo'
import PlaceHeader from '~components/Place/PlaceHeader'
import useCampaignDispo from '~hooks/useCampaignDispo'
import { Espace } from '~typings/api'

interface Props {
  place: Espace
}

const CampaignPlaceDetail = ({ place }: Props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const router = useRouter()
  const isCampaignTab = router.query.tab === '1'

  const displayPrecise = useMemo(() => {
    if (!place) return false
    return (
      place.accomodation ||
      place.technicalStaff ||
      place.danceCarpet === 'possible'
    )
  }, [place])

  const {
    campaignDispos,
    solidarityDisposNum,
    campaignDisposNum,
  } = useCampaignDispo(place?.disponibilities)

  return (
    <Box>
      <PlaceHeader place={place} />
      <Container px={{ base: 3, lg: 5 }}>
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems="flex-start"
          spacing={{ base: 6, lg: 10 }}
          pb={{ base: 6, lg: 12 }}
          pt={{ base: 6, lg: 12 }}
        >
          <Box flex={1} w="100%">
            <AspectRatio w="100%" maxH="500px" ratio={4 / 3} overflow="hidden">
              <PlaceCardCarousel images={place?.images} showNumber />
            </AspectRatio>
          </Box>

          <VStack spacing={2}>
            <CampaignDetailTabs />
            <PlaceDetailMainInfo
              place={place}
              displayPrecise={displayPrecise}
              isMobile={isMobile}
              isCampaignTab={isCampaignTab}
            />
            {isCampaignTab && <CampaignPlaceFiles place={place} />}
          </VStack>
        </Stack>

        {isCampaignTab ? (
          <CampaignApplicationSchedule disponibilities={campaignDispos} />
        ) : (
          <PlaceDetailCalendar place={place} />
        )}

        {Boolean(!isCampaignTab && campaignDisposNum) && (
          <CampaignDetailSwitcher isCampaignTab={false} />
        )}

        {Boolean(isCampaignTab && solidarityDisposNum) && (
          <CampaignDetailSwitcher isCampaignTab />
        )}

        {isMobile && (
          <PlaceAttributesGridMobile
            place={place}
            displayPrecise={displayPrecise}
          />
        )}

        <PlaceDetailExtraInfo place={place} />

        <PlaceDetailLocation place={place} />
      </Container>
    </Box>
  )
}

export default CampaignPlaceDetail

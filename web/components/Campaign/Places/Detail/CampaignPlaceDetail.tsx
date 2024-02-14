import React, { useMemo } from 'react'
import {
  Box,
  Container,
  useBreakpointValue,
  Stack,
  AspectRatio,
  VStack,
} from '@chakra-ui/react'
import PlaceAttributesGridMobile from '~components/Place/PlaceAttributesGridMobile'
import PlaceHeader from '~components/Place/PlaceHeader'
import { Espace } from '~typings/api'
import { useTranslation } from 'next-i18next'
import PlaceDetailMainInfo from '~components/Place/PlaceDetailPage/PlaceDetailMainInfo'
import PlaceDetailLocation from '~components/Place/PlaceDetailPage/PlaceDetailLocation'
import PlaceDetailExtraInfo from '~components/Place/PlaceDetailPage/PlaceDetailExtraInfo'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import CampaignDetailTabs from '~components/Campaign/Places/Detail/CampaignDetailTabs'
import { useRouter } from 'next/router'
import CampaignDetailCalendar from '~components/Campaign/Places/Detail/CampaignDetailCalendar'
import PlaceDetailCalendar from '~components/Place/PlaceDetailPage/PlaceDetailCalendar'
import CampaignDetailSwitcher from '~components/Campaign/Places/Detail/CampaignDetailSwitcher'

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
          </VStack>
        </Stack>

        {isCampaignTab ? (
          <CampaignDetailCalendar
            disponibilities={place?.disponibilities?.filter((d) =>
              Boolean(d?.campaign),
            )}
          />
        ) : (
          <PlaceDetailCalendar place={place} />
        )}

        <CampaignDetailSwitcher isCampaignTab={isCampaignTab} />

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

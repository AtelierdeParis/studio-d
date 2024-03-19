import React from 'react'
import {
  Box,
  Flex,
  Text,
  AspectRatio,
  LinkBox,
  SimpleGrid,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import { ROUTE_PLACE_DETAIL } from '~constants'
import { useTranslation } from 'next-i18next'
import FallbackImage from '~components/FallbackImage'
import LinkOverlay from '~components/LinkOverlay'
import { format } from '~utils/date'
import CampaignTag from '~components/Campaign/CampaignTag'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import useCampaignDispo from '~hooks/useCampaignDispo'

interface Props {
  place: Espace
  setFocus: (idPlace: string) => void
  listMode?: 'solidarity' | 'campaign'
}

const PlaceCard = ({ place, setFocus, listMode }: Props) => {
  const { t } = useTranslation('place')
  const { currentCampaign } = useCampaignContext()
  const { campaignDispos } = useCampaignDispo(place?.disponibilities)

  const hasCampaignDispo =
    currentCampaign?.mode === 'applications' && !!campaignDispos?.length
  return (
    <LinkBox
      w="100%"
      onMouseEnter={() => setFocus(place.id)}
      onMouseLeave={() => setFocus(null)}
    >
      <LinkOverlay
        href={{
          pathname: ROUTE_PLACE_DETAIL,
          query: { id: place.slug },
        }}
      >
        <Flex
          overflow="hidden"
          className="placeCard placeListCard"
          role="group"
          h="100%"
          w="100%"
          pb={7}
          borderBottom="1px solid"
          borderBottomColor="gray.100"
        >
          <Flex>
            <AspectRatio
              w="12vw"
              h="100%"
              ratio={4 / 3}
              overflow="hidden"
              pos="relative"
              borderRadius="sm"
            >
              {place.images.length > 0 ? (
                <PlaceCardCarousel images={place.images} />
              ) : (
                <FallbackImage />
              )}
            </AspectRatio>
          </Flex>
          <Box pl={5} flex={1}>
            <Box>
              <CampaignTag
                mode={listMode}
                disponibilitiesIds={campaignDispos?.map((d) => d.id)}
                hasCampaignDispo={hasCampaignDispo}
              />
              <Text fontFamily="mabry medium" isTruncated>
                {place.name}
              </Text>
              <Text color="gray.500" isTruncated>
                {place.users_permissions_user.structureName}
              </Text>
            </Box>

            <SimpleGrid columns={2} pt={4} w="fit-content" columnGap={2}>
              <Text color="gray.500">{t('card.city')}</Text>
              <Text textTransform="capitalize">{place.city.name}</Text>
              <Text color="gray.500">{t('card.surface')}</Text>
              <Text>{`${place.surface}m²`}</Text>
              <Text color="gray.500">{t('card.dim')}</Text>
              <Text>{`${place.roomLength} x ${place.width} m`}</Text>
              {listMode === 'campaign' && (
                <>
                  <Text color="gray.500" pr={9}>
                    {t('card.dates')}
                  </Text>
                  <Box>
                    {place?.disponibilities
                      ?.filter(
                        (d) =>
                          d.campaign?.toString() ===
                          currentCampaign?.id?.toString(),
                      )
                      .map((el) => (
                        <Text>
                          {`${format(el.start, 'dd/MM')} ${t('card.to')}
                      ${format(el.end, 'dd/MM')}`}
                        </Text>
                      ))}
                  </Box>
                </>
              )}
            </SimpleGrid>
          </Box>
        </Flex>
      </LinkOverlay>
    </LinkBox>
  )
}

export default PlaceCard

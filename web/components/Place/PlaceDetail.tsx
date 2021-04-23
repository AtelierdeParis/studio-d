import React from 'react'
import dynamic from 'next/dynamic'
import { saveAs } from 'file-saver'
import {
  Flex,
  Button,
  Text,
  Stack,
  Box,
  Link,
  Divider,
  Container,
  VStack,
  AspectRatio,
} from '@chakra-ui/react'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import OtherPlaces from '~components/Place/OtherPlaces'
import PlaceAttributesGrid from '~components/Place/PlaceAttributesGrid'
import PlaceHeader from '~components/Place/PlaceHeader'
import MarkdownRenderer from '~components/MarkdownRenderer'
import BookingScheduleContainer from '~components/Place/BookingScheduleContainer'
import Pin from 'public/assets/img/pin-outline.svg'
import Calendar from 'public/assets/img/calendar.svg'
import Compass from 'public/assets/img/compass.svg'
import Download from 'public/assets/img/download.svg'
import { Espace } from '~typings/api'
import { useTranslation } from 'next-i18next'
const Map = dynamic(() => import('~components/Map'), { ssr: false })

interface Props {
  place: Espace
}

const PlaceDetail = ({ place }: Props) => {
  const { t } = useTranslation('place')

  return (
    <Box>
      <PlaceHeader place={place} />
      <Container px={5}>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={10}
          pb={12}
          pt={12}
        >
          <Box flex={1}>
            <AspectRatio w="100%" maxH="500px" ratio={4 / 3} overflow="hidden">
              <PlaceCardCarousel images={place?.images} showNumber />
            </AspectRatio>
          </Box>
          <Box flex={1}>
            <Text fontFamily="mabry medium" fontWeight="500" fontSize="3xl">
              {place?.name}
            </Text>
            <Text fontSize="xl" color="gray.500" pt={1}>
              {place?.users_permissions_user?.structureName}
            </Text>
            {place?.users_permissions_user?.website && (
              <Text pt={2}>
                <Link
                  href={place?.users_permissions_user?.website}
                  isExternal
                  layerStyle="link"
                  color="gray.500"
                  textDecoration="underline"
                >
                  {place?.users_permissions_user?.website}
                </Link>
              </Text>
            )}
            <Divider mt={7} mb={5} opacity={0.4} />
            <Flex justifyContent="flex-end">
              <Flex>
                <Box textAlign="right" pr={3.5}>
                  <Text>{place?.address}</Text>
                  <Button
                    as={Link}
                    href="#map"
                    variant="line"
                    color="gray.500"
                    borderBottomColor="gray.500"
                  >
                    {t('detail.seeMap')}
                  </Button>
                </Box>
                <Pin stroke="black" height="26px" width="26px" />
              </Flex>
            </Flex>
            <Divider mt={5} mb={2} opacity={0.4} />
            <Text pb={8} fontSize="sm">
              {t('detail.precise')}
            </Text>
            <PlaceAttributesGrid place={place} />
          </Box>
        </Stack>
        <Flex alignItems="center" mb={8}>
          <Box w="18px" mt="-4px">
            <Calendar stroke="black" />
          </Box>
          <Text textStyle="h2" pl={5}>
            {t('detail.calendar')}
          </Text>
        </Flex>
        <BookingScheduleContainer place={place} />
        <Flex justifyContent="space-between" pt={18}>
          {(place?.about || place?.files?.length > 0) && (
            <Box pl={10} flex={1}>
              <Text textStyle="h2" mb={8}>
                {t('detail.about')}
              </Text>
              <VStack spacing={7} alignItems="flex-start">
                {place?.about && (
                  <Box overflow="hidden">
                    <MarkdownRenderer>{place?.about}</MarkdownRenderer>
                  </Box>
                )}
                {place?.files?.length > 0 && (
                  <Flex flexWrap="wrap">
                    {place?.files.map((file) => (
                      <Button
                        key={file.id}
                        mb={4}
                        mr={4}
                        leftIcon={<Download />}
                        colorScheme="gray"
                        onClick={() => {
                          saveAs(
                            process.env.NEXT_PUBLIC_BACK_URL + file.url,
                            file.name,
                          )
                        }}
                      >
                        {file.caption
                          ? `${file.caption} (${file.ext})`
                          : file.name}
                      </Button>
                    ))}
                  </Flex>
                )}
              </VStack>
            </Box>
          )}
          {place?.details && (
            <Box px={20} flex={1}>
              <Text textStyle="h2" mb={8}>
                {t('detail.details')}
              </Text>
              <Box overflow="hidden">
                <MarkdownRenderer>{place?.details}</MarkdownRenderer>
              </Box>
            </Box>
          )}
        </Flex>
        <Flex alignItems="flex-start" pt={20} id="map">
          <Box w="18px" mt={0.5}>
            <Compass />
          </Box>
          <Box pl={5}>
            <Text textStyle="h2" mb={5}>
              {t('detail.howToGo')}
            </Text>
            <Text>{t('detail.located', { address: place?.address })}</Text>
            {'geolocation' in navigator && (
              <Button
                variant="line"
                color="gray.500"
                borderBottomColor="gray.500"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const currentLatitude = position.coords.latitude
                      const currentLongitude = position.coords.longitude
                      window.open(
                        `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${currentLatitude},${currentLongitude};${place?.longitude},${place?.latitude}&geometries=geojson`,
                      )
                    },
                    (err) => {
                      console.log('err', err)
                    },
                    {
                      timeout: 30000,
                      enableHighAccuracy: true,
                      maximumAge: 75000,
                    },
                  )
                }}
              >
                {t('detail.itinerary')}
              </Button>
            )}
          </Box>
        </Flex>
        <Map
          mt={10}
          w="100%"
          h="370px"
          icon={{
            iconUrl: '/assets/img/pin.svg',
            iconSize: [42, 42],
          }}
          markers={[
            {
              id: place?.id,
              latitude: place?.latitude,
              longitude: place?.longitude,
            },
          ]}
        />
        {place?.users_permissions_user?.id && (
          <OtherPlaces userId={place?.users_permissions_user?.id} />
        )}
      </Container>
    </Box>
  )
}

export default PlaceDetail

import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import {
  Container,
  Flex,
  Button,
  Text,
  Stack,
  Box,
  Link,
  Divider,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { usePlace } from '~hooks/usePlace'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import OtherPlaces from '~components/Place/OtherPlaces'
import PlaceAttributesGrid from '~components/Place/PlaceAttributesGrid'
import BookingScheduleContainer from '~components/Place/BookingScheduleContainer'
import Loading from '~components/Loading'
import Pin from 'public/assets/img/pin-outline.svg'
import Calendar from 'public/assets/img/calendar.svg'
import Compass from 'public/assets/img/compass.svg'
import Download from 'public/assets/img/download.svg'
const Map = dynamic(() => import('~components/Map'), { ssr: false })

interface IPlaceDetail {
  placeId: string
}

const PlaceDetail = ({ placeId }: IPlaceDetail) => {
  const { t } = useTranslation('place')
  const { data: place, isLoading } = usePlace(placeId)

  return (
    <Container pt={12}>
      <Loading isLoading={isLoading}>
        <Stack direction="row" alignItems="flex-start" spacing={10} pb={12}>
          <Box flex={1}>
            <PlaceCardCarousel images={place?.images} showNumber />
          </Box>
          <Box flex={1}>
            <Text fontFamily="mabry medium" fontWeight="500" fontSize="3xl">
              {place?.name}
            </Text>
            <Text fontSize="xl" color="gray.500" pt={1}>
              {place?.users_permissions_user.structureName}
            </Text>

            {place?.users_permissions_user.website && (
              <Text pt={2}>
                <Link
                  href={place?.users_permissions_user.website}
                  isExternal
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
        <Flex alignItems="flex-start">
          <Box w="18px" mt={0.5}>
            <Calendar stroke="black" />
          </Box>
          <Text textStyle="h2" mb={8} pl={5}>
            {t('detail.calendar')}
          </Text>
        </Flex>
        <BookingScheduleContainer place={place} />
        <Flex justifyContent="space-between" pt={18}>
          <Box pl={10}>
            <Text textStyle="h2" mb={8}>
              {t('detail.about')}
            </Text>
            <VStack spacing={7} alignItems="flex-start">
              {place?.about && (
                <Text whiteSpace="pre-line">{place?.about}</Text>
              )}
              {place?.files.length > 0 && (
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
          <Box px={20}>
            <Text textStyle="h2" mb={8}>
              {t('detail.details')}
            </Text>
            <Text whiteSpace="pre-line">{place?.about}</Text>
          </Box>
        </Flex>
        <Flex alignItems="flex-start" pt={20} id="map">
          <Box w="18px">
            <Compass />
          </Box>
          <Box pl={5}>
            <Text textStyle="h2" mb={5}>
              {t('detail.howToGo')}
            </Text>
            <Text>{t('detail.located', { address: place?.address })}</Text>
            {/* TODO: open streep map link */}
            <Button
              variant="line"
              color="gray.500"
              borderBottomColor="gray.500"
              onClick={() => {
                if ('geolocation' in navigator) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const currentLatitude = position.coords.latitude
                    const currentLongitude = position.coords.longitude
                    window.open(
                      `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${currentLongitude},${currentLatitude};${place?.longitude},${place?.latitude}`,
                    )
                  })
                }
              }}
            >
              {t('detail.itinerary')}
            </Button>
          </Box>
        </Flex>
        <Map
          mt={10}
          w="100%"
          h="370px"
          markers={[
            {
              id: place?.id,
              latitude: place?.latitude,
              longitude: place?.longitude,
            },
          ]}
        />
        <OtherPlaces userId={place?.users_permissions_user.id} />
      </Loading>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  return {
    props: {
      placeId: query.placeId,
      ...(await serverSideTranslations(locale, ['common', 'place'])),
    },
  }
}

export default PlaceDetail

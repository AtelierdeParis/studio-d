import React, { useMemo } from 'react'
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
  useBreakpointValue,
} from '@chakra-ui/react'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import OtherPlaces from '~components/Place/OtherPlaces'
import PlaceAttributesGrid from '~components/Place/PlaceAttributesGrid'
import PlaceAttributesGridMobile from '~components/Place/PlaceAttributesGridMobile'
import PlaceHeader from '~components/Place/PlaceHeader'
import MarkdownRenderer from '~components/MarkdownRenderer'
import BookingScheduleContainer from '~components/Place/BookingScheduleContainer'
import Pin from 'public/assets/img/pin-outline.svg'
import Calendar from 'public/assets/img/calendar.svg'
import Download from 'public/assets/img/download.svg'
import { Espace } from '~typings/api'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import PlaceItinerary from '~components/Place/PlaceItinerary'

const Map = dynamic(() => import('~components/Map'), { ssr: false })

interface Props {
  place: Espace
}

const PlaceDetail = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const isMobile = useBreakpointValue({ base: true, lg: false })

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
          <Box flex={1} w="100%">
            <Text
              fontFamily="mabry medium"
              fontWeight="500"
              fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
            >
              {place?.name}
            </Text>
            <Text
              fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
              color="gray.500"
              pt={{ base: 0, lg: 1 }}
            >
              {place?.users_permissions_user?.structureName}
            </Text>
            {place?.users_permissions_user?.website && (
              <Text pt={{ base: 1, lg: 2 }}>
                <Link
                  href={place?.users_permissions_user?.website}
                  isExternal
                  layerStyle="link"
                  fontSize={{ base: 'md', sm: 'lg' }}
                  color="gray.500"
                  textDecoration="underline"
                >
                  {place?.users_permissions_user?.website}
                </Link>
              </Text>
            )}
            <Divider mt={{ base: 5, lg: 7 }} mb={5} opacity={0.4} />
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
            {!isMobile && (
              <>
                <Divider mt={5} mb={2} opacity={0.4} />
                <PlaceAttributesGrid
                  place={place}
                  displayPrecise={displayPrecise}
                />
              </>
            )}
          </Box>
        </Stack>
        <Flex alignItems="center" mb={{ base: 4, lg: 8 }}>
          <Box w="18px" mt="-4px">
            <Calendar stroke="black" />
          </Box>
          <Text textStyle="h2" pl={5}>
            {t('detail.calendar')}
          </Text>
        </Flex>
        <BookingScheduleContainer place={place} />
        {isMobile && (
          <PlaceAttributesGridMobile
            place={place}
            displayPrecise={displayPrecise}
          />
        )}
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
          pt={{ base: 14, lg: 18 }}
          spacing={10}
        >
          {(place?.about || place?.files?.length > 0) && (
            <Box px={{ base: 0, lg: 10 }} flex={1}>
              <Text textStyle="h2" mb={8}>
                {t('detail.about')}
              </Text>
              <VStack spacing={7} alignItems="flex-start">
                {place?.about && (
                  <Box overflow="hidden" wordBreak="break-word">
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
                        fontSize="md"
                        onClick={() => {
                          axios({
                            url: file.url,
                            method: 'GET',
                            responseType: 'blob',
                          }).then(() => {
                            saveAs(file.url, file.name)
                          })
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
            <Box px={{ base: 0, lg: 10 }} flex={1}>
              <Text textStyle="h2" mb={8}>
                {t('detail.details')}
              </Text>
              <Box overflow="hidden" wordBreak="break-word">
                <MarkdownRenderer>{place?.details}</MarkdownRenderer>
              </Box>
            </Box>
          )}
        </Stack>
        <PlaceItinerary place={place} />
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

import React from 'react'
import Link from '~components/Link'
import LinkOverlay from '~components/LinkOverlay'
import Tag from '~components/Tag'
import Image from '~components/Image'
import FallbackImage from '~components/FallbackImage'
import {
  Box,
  Button,
  Text,
  Flex,
  Divider,
  HStack,
  AspectRatio,
  Circle,
  ButtonGroup,
  LinkBox,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { DisponibilityStatus } from '~@types/disponibility.d'
import useNbDisponibility from '~hooks/useNbDisponibility'
import useNbBooking from '~hooks/useNbBooking'
import useIsOccupied from '~hooks/useIsOccupied'
import {
  ROUTE_ACCOUNT_PLACE_DETAIL,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'
import { useTranslation } from 'next-i18next'
import UnpublishModal from '~components/Account/Place/UnpublishModal'
import PublishModal from '~components/Account/Place/PublishModal'
import DeletePlaceModal from '~components/Account/Place/DeletePlaceModal'
import { format } from '~utils/date'

interface IPlaceListItem {
  place: Espace
}

const PlaceListItem = ({ place }: IPlaceListItem) => {
  const { t } = useTranslation('place')
  const { available, booked } = useNbDisponibility(place.disponibilities)
  const { coming, past, pending } = useNbBooking(place.disponibilities)
  const isOccupied = useIsOccupied(booked)

  return (
    <LinkBox w="100%">
      <Flex
        py={8}
        w="100%"
        px={3}
        borderBottom="1px solid"
        borderColor="gray.100"
        _hover={{
          bgColor: 'gray.hover',
        }}
      >
        <AspectRatio
          w="230px"
          ratio={4 / 3}
          mr={8}
          alignItems="center"
          {...(!place.published
            ? { filter: 'grayscale(1)', opacity: 0.5 }
            : {})}
        >
          {place.images.length > 0 ? (
            <Image src={place.images[0].url} />
          ) : (
            <FallbackImage />
          )}
        </AspectRatio>
        <Flex direction="column" justifyContent="space-between" flex={1}>
          <Flex justifyContent="space-between">
            <Box>
              <LinkOverlay
                href={{
                  pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                  query: { id: place.id },
                }}
              >
                <Text fontSize="lg" fontFamily="mabry medium">
                  {place.name}
                </Text>
              </LinkOverlay>
              <Flex>
                <Text mr={2}>{place.address}</Text>
                {isOccupied && (
                  <Tag status="occupied">{t('list.occupied')}</Tag>
                )}
              </Flex>
            </Box>
            {place.published ? (
              <UnpublishModal placeId={place.id} />
            ) : (
              <ButtonGroup spacing={4} alignSelf="center">
                <PublishModal placeId={place.id} />
                <DeletePlaceModal placeId={place.id} />
              </ButtonGroup>
            )}
          </Flex>
          <Flex>
            <Box flex={1}>
              <Flex alignItems="center">
                <Text color="gray.500" pr={2}>
                  {t('list.disponibility')}
                </Text>
                <Button
                  as={Link}
                  href={{
                    pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                    query: { id: place.id, index: 2 },
                  }}
                  variant="line"
                >
                  {place?.disponibilities.length > 0
                    ? t('list.edit')
                    : t('list.add')}
                </Button>
              </Flex>
              <Box>
                {place?.disponibilities.length > 0 ? (
                  <Box>
                    <Text>
                      {t(
                        `list.available${
                          place?.disponibilities.length > 1 ? 's' : ''
                        }`,
                        { nb: available.length },
                      )}
                    </Text>
                    <Text>
                      {t(`list.filledUntil`, {
                        date: format(place.filledUntil),
                      })}
                    </Text>
                  </Box>
                ) : (
                  <Text color="red.600" pt={2}>
                    {t('list.noDisponibility')}
                  </Text>
                )}
              </Box>
            </Box>
            <Divider orientation="vertical" mx={5} />
            <Box flex={1}>
              <Flex alignItems="center">
                <Text color="gray.500" pr={2}>
                  {t('list.requests')}
                </Text>
                <Button as={Link} href={ROUTE_ACCOUNT_REQUEST} variant="line">
                  {t('list.see')}
                </Button>
              </Flex>
              <Box pt={2}>
                {pending.length > 0 ? (
                  <Tag status={DisponibilityStatus.PENDING}>
                    {t('list.nbPending', { nb: pending.length })}
                  </Tag>
                ) : (
                  <Divider w="14px" />
                )}
              </Box>
            </Box>
            <Divider orientation="vertical" mx={5} />
            <Box flex={1}>
              <Flex alignItems="center">
                <Text color="gray.500" pr={2}>
                  {t('list.bookings')}
                </Text>
                <Button as={Link} href={ROUTE_ACCOUNT_BOOKING} variant="line">
                  {t('list.see')}
                </Button>
              </Flex>
              <Box pt={2}>
                {coming.length > 0 || past.length > 0 ? (
                  <HStack spacing={2.5}>
                    {coming.length > 0 && (
                      <Tag status={DisponibilityStatus.BOOKED}>
                        {t('list.nbBooking', { nb: coming.length })}
                      </Tag>
                    )}
                    {past.length && (
                      <Tag status={DisponibilityStatus.PAST}>
                        {t('list.nbPassed', { nb: past.length })}
                      </Tag>
                    )}
                  </HStack>
                ) : (
                  <Divider w="14px" />
                )}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default PlaceListItem

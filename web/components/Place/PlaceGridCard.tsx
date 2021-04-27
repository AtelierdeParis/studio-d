import React, { useMemo } from 'react'
import {
  Box,
  Flex,
  Text,
  Divider,
  AspectRatio,
  LinkBox,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import PlaceCardCarousel from '~components/Place/PlaceCardCarousel'
import { ROUTE_PLACE_DETAIL } from '~constants'
import { useTranslation } from 'next-i18next'
import FallbackImage from '~components/FallbackImage'
import LinkOverlay from '~components/LinkOverlay'
import Tag from '~components/Tag'
import { DisponibilityStatus } from '~@types/disponibility.d'
import addWeeks from 'date-fns/addWeeks'
import { SearchQuery } from '~utils/search'
import useNbDispoPerWeek from '~hooks/useNbDispoPerWeek'
import useDispoInRange from '~hooks/useDispoInRange'

interface Props {
  place: Espace
  searchQuery?: SearchQuery
}

const PlaceGridCard = ({ place, searchQuery }: Props) => {
  const { t } = useTranslation('place')

  const disposInRange = useDispoInRange(
    place?.disponibilities,
    searchQuery?.['disponibilities.start_gte'],
    searchQuery?.['disponibilities.end_lte'],
  )

  const disposThisWeek = useNbDispoPerWeek(
    new Date(),
    disposInRange || place?.disponibilities,
  )
  const disposNextWeek = useNbDispoPerWeek(
    addWeeks(new Date(), 1),
    disposInRange || place?.disponibilities,
  )

  return (
    <LinkBox>
      <LinkOverlay
        href={{
          pathname: ROUTE_PLACE_DETAIL,
          query: { id: place.slug },
        }}
      >
        <Flex
          direction="column"
          overflow="hidden"
          borderRadius="sm"
          className="placeCard"
          role="group"
          h="100%"
          id={`place-${place.id}`}
        >
          <AspectRatio
            w="100%"
            maxH="250px"
            ratio={4 / 3}
            overflow="hidden"
            pos="relative"
          >
            {place.images.length > 0 ? (
              <PlaceCardCarousel images={place.images} />
            ) : (
              <FallbackImage />
            )}
          </AspectRatio>
          <Flex
            flex={1}
            justifyContent="space-between"
            direction="column"
            p={4}
            borderBottomRadius="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Box fontSize="md">
              <Text fontFamily="mabry medium" isTruncated>
                {place.name}
              </Text>
              <Text color="gray.500" isTruncated>
                {place.users_permissions_user.structureName}
              </Text>
            </Box>
            {place?.disponibilities?.length === 0 && (
              <Tag
                status={DisponibilityStatus.PAST}
                alignSelf="flex-start"
                mt={1.5}
              >
                {t('card.noDispo')}
              </Tag>
            )}
            {disposThisWeek?.length > 0 && (
              <Tag
                status={DisponibilityStatus.AVAILABLE}
                alignSelf="flex-start"
                mt={1.5}
              >
                {t(
                  `card.${disposInRange ? 'searchDispo' : 'thisWeek'}${
                    disposThisWeek?.length > 1 ? 's' : ''
                  }`,
                  {
                    nb: disposThisWeek.length,
                  },
                )}
              </Tag>
            )}
            {disposThisWeek?.length === 0 && disposNextWeek?.length > 0 && (
              <Tag
                status={DisponibilityStatus.PENDING}
                alignSelf="flex-start"
                mt={1.5}
              >
                {t(
                  `card.${disposInRange ? 'searchDispo' : 'nextWeek'}${
                    disposNextWeek?.length > 1 ? 's' : ''
                  }`,
                  {
                    nb: disposNextWeek.length,
                  },
                )}
              </Tag>
            )}
            <Box fontSize="sm" pt={6}>
              <Flex w="100%">
                <Text color="gray.500" pr={9}>
                  {t('card.city')}
                </Text>
                <Text isTruncated>{place.city}</Text>
              </Flex>
              <Divider my={2} borderColor="gray.100" />
              <Flex justifyContent="space-between" alignItems="center">
                <Flex flex={1}>
                  <Text color="gray.500" pr={3}>
                    {t('card.surface')}
                  </Text>
                  <Text>{`${place.surface}m²`}</Text>
                </Flex>
                <Divider
                  orientation="vertical"
                  h="20px"
                  borderColor="gray.100"
                />
                <Flex flex={1}>
                  <Text color="gray.500" px={3}>
                    {t('card.dim')}
                  </Text>
                  <Text whiteSpace="pre">{`${place.roomLength} x ${place.width} m`}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </LinkOverlay>
    </LinkBox>
  )
}

export default PlaceGridCard

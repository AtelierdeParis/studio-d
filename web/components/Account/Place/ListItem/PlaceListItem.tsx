import React, { useEffect } from 'react'
import Link from '~components/Link'
import Tag from '~components/Tag'
import Image from '~components/Image'
import FallbackImage from '~components/FallbackImage'
import {
  Box,
  Text,
  Flex,
  AspectRatio,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import useNbDisponibility from '~hooks/useNbDisponibility'
import useIsOccupied from '~hooks/useIsOccupied'
import { useIsComplete } from '~hooks/useIsComplete'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { Trans, useTranslation } from 'next-i18next'
import PlaceListItemOptions from '~components/Account/Place/PlaceListItemOptions'
import NotComplete from '~components/NotComplete'
import SubInfo from '~components/Account/Place/ListItem/SubInfo'

interface Props {
  place: Espace
  setVisible: (type: boolean) => void
}

const PlaceListItem = ({ place, setVisible }: Props) => {
  const { t } = useTranslation('place')
  const { available, booked } = useNbDisponibility(place.disponibilities)
  const isOccupied = useIsOccupied(booked)
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const isComplete = useIsComplete(place)

  useEffect(() => {
    if (!isComplete) {
      setVisible(true)
    }
  }, [isComplete])

  return (
    <Flex
      py={8}
      w="100%"
      px={{ base: 0, md: 3 }}
      borderBottom="1px solid"
      borderColor="gray.100"
      _hover={{
        bgColor: 'gray.hover',
      }}
      direction="column"
    >
      <Flex direction={{ base: 'column-reverse', lg: 'row' }}>
        <Link
          href={{
            pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
            query: { id: place.slug },
          }}
        >
          <AspectRatio
            w={{ base: '100%', lg: '230px' }}
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
        </Link>
        <Flex
          direction="column"
          justifyContent="space-between"
          flex={1}
          mb={{ base: 5, lg: 0 }}
        >
          <Flex
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', xl: 'center' }}
          >
            <Link
              href={{
                pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                query: { id: place.slug },
              }}
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Box>
                <Text fontSize="lg" fontFamily="mabry medium">
                  {place.name}
                </Text>
                <Flex>
                  <Text mr={2} display={{ base: 'none', md: 'block' }}>
                    {place.address}
                  </Text>
                  {isOccupied && (
                    <Tag status="occupied">{t('list.occupied')}</Tag>
                  )}
                </Flex>
              </Box>
            </Link>
            <PlaceListItemOptions place={place} />
          </Flex>
          {!isMobile && (
            <SubInfo
              place={place}
              available={available}
              isComplete={isComplete}
            />
          )}
        </Flex>
      </Flex>
      {isMobile && (
        <SubInfo
          place={place}
          available={available}
          isMobile
          isComplete={isComplete}
        />
      )}
      {!isComplete && (
        <NotComplete mt={8} w="fit-content">
          <Trans
            i18nKey="place:list.migration.error"
            components={{
              a: (
                <Link
                  href={{
                    pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                    query: { id: place.slug },
                  }}
                  textDecoration="underline"
                />
              ),
            }}
          />
        </NotComplete>
      )}
    </Flex>
  )
}

export default PlaceListItem

import React, { useEffect } from 'react'
import Link from '~components/Link'
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
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react'
import { Espace } from '~typings/api'
import { DisponibilityStatus } from '~@types/disponibility.d'
import useNbDisponibility from '~hooks/useNbDisponibility'
import useNbBooking from '~hooks/useNbBooking'
import useIsOccupied from '~hooks/useIsOccupied'
import { useIsComplete } from '~hooks/useIsComplete'
import {
  ROUTE_ACCOUNT_PLACE_DETAIL,
  ROUTE_ACCOUNT_BOOKING,
  ROUTE_ACCOUNT_REQUEST,
} from '~constants'
import { Trans, useTranslation } from 'next-i18next'
import { format } from '~utils/date'
import PlaceListItemOptions from '~components/Account/Place/PlaceListItemOptions'
import NotComplete from '~components/NotComplete'

const SubInfo = ({ place, available, isMobile = false, isComplete = true }) => {
  const { t } = useTranslation('place')
  const { coming, past, pending } = useNbBooking(place.disponibilities)

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      pt={{ base: 4, lg: 0 }}
      spacing={{ base: 3, lg: 0 }}
    >
      <Box flex={1} fontSize={{ base: 'sm', sm: 'md' }}>
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.disponibility')}
          </Text>
          {isComplete && (
            <Button
              as={Link}
              href={{
                pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
                query: { id: place.slug, index: 2 },
              }}
              variant="line"
            >
              {available.length > 0 ? t('list.edit') : t('list.add')}
            </Button>
          )}
        </Flex>
        <Box>
          {available.length > 0 ? (
            <Box>
              <Text>
                {t(`list.available${available.length > 1 ? 's' : ''}`, {
                  nb: available.length,
                })}
              </Text>
              <Text>
                {t(`list.filledUntil`, {
                  date: format(place.filledUntil),
                })}
              </Text>
            </Box>
          ) : (
            <>
              {!place.filledUntil ? (
                <Text pt={2} color="red.600" fontSize="sm">
                  {t('list.needDispo')}
                </Text>
              ) : (
                <Text color="red.600">{t('list.noDisponibility')}</Text>
              )}
            </>
          )}
        </Box>
      </Box>
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        mx={5}
        opacity={0.5}
        display={{ base: 'none', md: 'block', lg: 'none', xl: 'block' }}
      />
      <Box
        flex={1}
        display={{ base: 'none', md: 'block', lg: 'none', xl: 'block' }}
      >
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.requests')}
          </Text>
          {pending.length > 0 && (
            <Button as={Link} href={ROUTE_ACCOUNT_REQUEST} variant="line">
              {t('list.see')}
            </Button>
          )}
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
      <Divider
        orientation={isMobile ? 'horizontal' : 'vertical'}
        mx={5}
        display={{ base: 'none', md: 'block' }}
        opacity={0.5}
      />
      <Box flex={1} display={{ base: 'none', md: 'block' }}>
        <Flex alignItems="center">
          <Text color="gray.500" pr={2}>
            {t('list.bookings')}
          </Text>
          {(coming.length > 0 || past.length > 0) && (
            <Button as={Link} href={ROUTE_ACCOUNT_BOOKING} variant="line">
              {t('list.see')}
            </Button>
          )}
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
    </Stack>
  )
}

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

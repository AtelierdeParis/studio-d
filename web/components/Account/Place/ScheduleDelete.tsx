import React, { useMemo, useContext, useState } from 'react'
import {
  Flex,
  Box,
  Text,
  Circle,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { format } from '~utils/date'
import Tag from '~components/Tag'
import Link from '~components/Link'
import useToast from '~hooks/useToast'
import { ROUTE_ACCOUNT_BOOKING, ROUTE_ACCOUNT_REQUEST } from '~constants'
import { client } from '~api/client-api'
import Delete from 'public/assets/img/delete.svg'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { useQueryClient } from 'react-query'

const ScheduleDelete = () => {
  const { place, setToDelete, eventsIdToDelete } = useContext(ScheduleContext)
  const { available, booked } = useMemo(
    () =>
      eventsIdToDelete
        .map((eventId) => {
          const event = place?.disponibilities.find(
            (dispo) => dispo.id === eventId,
          )
          return event
        })
        .reduce(
          (total, current) => {
            if (!current.booking || !current.booking.id) {
              total.available.push(current)
              return total
            }
            if (!total.booked[current.booking.id]) {
              total.booked[current.booking.id] = {
                booking: current.booking,
                dispos: [current],
              }
            } else {
              total.booked[current.booking.id].dispos.push(current)
            }
            return total
          },
          { available: [], booked: {} },
        ),
    [eventsIdToDelete, place?.disponibilities],
  )

  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('place')
  const { successToast, errorToast } = useToast()

  const queryClient = useQueryClient()

  const isPlural = useMemo(
    () => (available.length > 0 || Object.keys(booked).length > 1 ? 's' : ''),
    [available, booked],
  )

  const isAvailablePlural = useMemo(() => (available.length > 1 ? 's' : ''), [
    available,
  ])

  const isBookedPlural = useMemo(
    () =>
      Object.keys(booked).length > 1 ||
      (Object.keys(booked).length === 1 &&
        booked[Object.keys(booked)[0]].dispos.length > 1)
        ? 's'
        : '',
    [available],
  )

  const onDelete = () => {
    setLoading(true)
    Promise.all(
      available.map((dispo) =>
        client.disponibilities.disponibilitiesDelete(dispo.id),
      ),
    )
      .then((res) => {
        setToDelete([])
        successToast(t('schedule.delete.success'))

        const deletedIds = res.map(({ data }) => data.id)
        queryClient.setQueryData(['place', place.slug], {
          ...place,
          disponibilities: place.disponibilities.filter(
            (dispo) => !deletedIds.includes(dispo.id),
          ),
        })
      })
      .catch(() => errorToast(t('schedule.delete.error')))
      .finally(() => setLoading(false))
  }

  if (available.length === 0 && Object.keys(booked).length === 0) return null

  return (
    <Box
      w="100%"
      pb={{ base: 6 }}
      mb={{ base: 6 }}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Text fontFamily="mabry medium" pb={2}>
        {t(`schedule.delete.title${isPlural}`, {
          nb: eventsIdToDelete.length,
        })}
      </Text>
      {available.length > 0 && (
        <>
          <Text pt={5} fontFamily="mabry medium" pb={1.5}>
            {t(`schedule.delete.slotAvailable${isAvailablePlural}`, {
              nb: available.length,
            })}
          </Text>
          <VStack spacing={1} alignItems="flex-start">
            {available.map((dispo) => (
              <Box key={dispo.id} fontSize={{ base: 'sm', sm: 'md' }}>
                <Flex alignItems="center">
                  <Circle size="6px" mb={0.5} bgColor="gray.200" />
                  <Flex pl={3} alignItems="center" flexWrap="wrap">
                    <Text>{format(dispo.start)}</Text>
                    {dispo.end !== dispo.start && (
                      <Text pl={1.5}>
                        {' - '}
                        {format(dispo.end)}
                      </Text>
                    )}
                    <Text textTransform="lowercase" pl={1.5}>
                      {`(${
                        dispo.when
                          ? t(`schedule.${dispo.when}`)
                          : t(`schedule.type.${dispo.type}`)
                      })`}
                    </Text>
                    {dispo.dispositif && (
                      <Text pl={1.5}>{`- ${dispo.dispositif.name}`}</Text>
                    )}
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
          <Flex alignItems="center" mt={5}>
            <Button
              variant="delete"
              leftIcon={<Delete />}
              onClick={onDelete}
              isLoading={isLoading}
            >
              <Text ml={2}>
                {t(`schedule.delete.delete${isAvailablePlural}`)}
              </Text>
            </Button>
            <Button
              variant="unstyled"
              color="gray.500"
              ml={4}
              onClick={() => setToDelete([])}
            >
              {t(`schedule.cancel`)}
            </Button>
          </Flex>
        </>
      )}
      {Object.keys(booked).length > 0 && available.length > 0 && (
        <Divider my={6} />
      )}
      {Object.keys(booked).length > 0 && (
        <>
          <Text
            pt={available.length > 0 ? 0 : 5}
            fontFamily="mabry medium"
            pb={1.5}
          >
            {t(`schedule.delete.slotNotAvailable${isBookedPlural}`)}
          </Text>
          <VStack spacing={4} alignItems="flex-start">
            {Object.keys(booked).map((key) => {
              const { booking, dispos } = booked[key]
              const isRequest = [
                'pending',
                'requestcanceled',
                'requestcanceledbyplace',
              ].includes(booking.status)
              const route = isRequest
                ? ROUTE_ACCOUNT_REQUEST
                : ROUTE_ACCOUNT_BOOKING
              return (
                <Box key={booking.id}>
                  <Text mt={2} fontFamily="mabry medium">
                    {t(`schedule.delete.${isRequest ? 'request' : 'booking'}`, {
                      ref: booking.id,
                    })}
                  </Text>
                  {dispos.map((dispo) => (
                    <Flex alignItems="center" my={1.5} key={dispo.id}>
                      <Circle size="6px" mb={0.5} bgColor="gray.200" />
                      <Flex pl={3} alignItems="center">
                        <Text>{format(dispo.start)}</Text>
                        <Text textTransform="lowercase" px={1.5}>
                          {`(${
                            dispo.when
                              ? t(`schedule.${dispo.when}`)
                              : t(`schedule.type.${dispo.type}`)
                          })`}
                        </Text>
                        <Tag status={dispo.status} />
                      </Flex>
                    </Flex>
                  ))}
                  <Text pt={1}>
                    {t('schedule.delete.booked', {
                      name: booking?.company?.structureName,
                    })}
                    <Link
                      textDecoration="underline"
                      ml={1.5}
                      whiteSpace="pre"
                      href={`${route}?id=${booking?.id}`}
                      as={`${route}/${booking?.id}`}
                    >
                      {t(`schedule.delete.see.${booking.status}`)}
                    </Link>
                  </Text>
                </Box>
              )
            })}
          </VStack>
        </>
      )}
    </Box>
  )
}

export default ScheduleDelete

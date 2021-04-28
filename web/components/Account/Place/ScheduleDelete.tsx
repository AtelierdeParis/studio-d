import React, { useMemo, useContext, useState } from 'react'
import { Flex, Box, Text, Circle, VStack, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { DisponibilityStatus } from '~@types/disponibility.d'
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
  const dispos = useMemo(
    () =>
      eventsIdToDelete.map((eventId) => {
        const event = place?.disponibilities.find(
          (dispo) => dispo.id === eventId,
        )
        return event
      }),
    [eventsIdToDelete, place?.disponibilities],
  )
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation('place')
  const { successToast, errorToast } = useToast()
  const queryClient = useQueryClient()

  const { available, booked } = useMemo(
    () =>
      dispos.reduce(
        (total, event) => {
          if (event.status !== DisponibilityStatus.AVAILABLE)
            total.booked.push(event)
          else total.available.push(event)
          return total
        },
        { available: [], booked: [] },
      ),
    [dispos],
  )
  const isPlural = useMemo(() => (dispos.length > 1 ? 's' : ''), [dispos])

  const isAvailablePlural = useMemo(() => (available.length > 1 ? 's' : ''), [
    available,
  ])

  const isBookedPlural = useMemo(() => (booked.length > 1 ? 's' : ''), [
    available,
  ])

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

  if (dispos.length === 0) return null

  return (
    <Box
      w="100%"
      pb={{ base: 6 }}
      mb={{ base: 6 }}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Text fontFamily="mabry medium" pb={2}>
        {t(`schedule.delete.title${isPlural}`, { nb: dispos.length })}
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
      {booked.length > 0 && (
        <>
          <Text pt={5} fontFamily="mabry medium" pb={1.5}>
            {t(`schedule.delete.slotNotAvailable${isBookedPlural}`, {
              nb: booked.length,
            })}
          </Text>
          <VStack spacing={4} alignItems="flex-start">
            {booked.map((dispo) => {
              const route = ['pending', 'canceled'].includes(dispo.status)
                ? ROUTE_ACCOUNT_REQUEST
                : ROUTE_ACCOUNT_BOOKING
              return (
                <Box key={dispo.id}>
                  <Flex alignItems="center">
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
                  <Text pt={1}>
                    {t('schedule.delete.booked', {
                      name: dispo?.booking?.company?.structureName,
                    })}
                    <Link
                      textDecoration="underline"
                      ml={1.5}
                      whiteSpace="pre"
                      href={`${route}?id=${dispo?.booking?.id}`}
                      as={`${route}/${dispo?.booking?.id}`}
                    >
                      {t(`schedule.delete.see.${dispo.status}`)}
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

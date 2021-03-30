import React, { useMemo, useContext } from 'react'
import { Flex, Box, Text, Circle, VStack, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Disponibility, DisponibilityStatus } from '~@types/disponibility.d'
import format from 'date-fns/format'
import Tag from '~components/Tag'
import Link from '~components/Link'
import useToast from '~hooks/useToast'
import { deleteDisponibility } from '~api/api'
import Delete from 'public/assets/img/delete.svg'
import ScheduleContext from '~components/Account/Place/ScheduleContext'
import { useQueryClient } from 'react-query'

interface IScheduleDelete {
  disponibilities: Disponibility[]
}

const ScheduleDelete = ({ disponibilities = [] }: IScheduleDelete) => {
  const { t } = useTranslation('place')
  const { successToast, errorToast } = useToast()
  const { place, setToDelete } = useContext(ScheduleContext)
  const queryClient = useQueryClient()

  const { available, booked } = useMemo(
    () =>
      disponibilities.reduce(
        (total, event) => {
          if (event.status !== DisponibilityStatus.AVAILABLE)
            total.booked.push(event)
          else total.available.push(event)
          return total
        },
        { available: [], booked: [] },
      ),
    [disponibilities],
  )
  const isPlural = useMemo(() => (disponibilities.length > 1 ? 's' : ''), [
    disponibilities,
  ])

  const isAvailablePlural = useMemo(() => (available.length > 1 ? 's' : ''), [
    available,
  ])

  const isBookedPlural = useMemo(() => (booked.length > 1 ? 's' : ''), [
    available,
  ])

  const onDelete = () => {
    Promise.all(available.map((dispo) => deleteDisponibility(dispo.id)))
      .then((res) => {
        setToDelete([])
        successToast(t('schedule.delete.success'))

        const deletedIds = res.map(({ data }) => data.id)
        queryClient.setQueryData(['place', place.id], {
          ...place,
          disponibilities: place.disponibilities.filter(
            (dispo) => !deletedIds.includes(dispo.id),
          ),
        })
      })
      .catch(() => errorToast(t('schedule.delete.error')))
  }

  return (
    <Box w="100%">
      <Text fontFamily="mabry medium" pb={2}>
        {t(`schedule.delete.title${isPlural}`, { nb: disponibilities.length })}
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
              <Box key={dispo.id}>
                <Flex alignItems="center">
                  <Circle size="6px" mb={0.5} bgColor="gray.200" />
                  <Flex pl={3} alignItems="center">
                    <Text>{format(new Date(dispo.start), 'dd/MM/yyyy')}</Text>
                    {dispo.end !== dispo.start && (
                      <Text pl={1.5}>
                        {' - '}
                        {format(new Date(dispo.end), 'dd/MM/yyyy')}
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
          <Button
            variant="delete"
            leftIcon={<Delete />}
            mt={5}
            onClick={onDelete}
          >
            <Text ml={2}>
              {t(`schedule.delete.delete${isAvailablePlural}`)}
            </Text>
          </Button>
        </>
      )}
      {booked.length > 0 && (
        <>
          <Text pt={5} fontFamily="mabry medium" pb={1.5}>
            {t(`schedule.delete.slotNotAvailable${isBookedPlural}`, {
              nb: booked.length,
            })}
          </Text>
          <VStack spacing={1} alignItems="flex-start">
            {booked.map((dispo) => (
              <Box key={dispo.id}>
                <Flex alignItems="center">
                  <Circle size="6px" mb={0.5} bgColor="gray.200" />

                  <Flex pl={3} alignItems="center">
                    <Text>{format(new Date(dispo.start), 'dd/MM/yyyy')}</Text>
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
                  {t('schedule.delete.booked', { name: 'XXXXX' })}
                  {/* TODO: handle link */}
                  <Link
                    href="#"
                    textDecoration="underline"
                    ml={1.5}
                    whiteSpace="pre"
                  >
                    {/* TODO: handle company name */}
                    {t(`schedule.delete.see.${dispo.status}`)}
                  </Link>
                </Text>
              </Box>
            ))}
          </VStack>
        </>
      )}
    </Box>
  )
}

export default ScheduleDelete

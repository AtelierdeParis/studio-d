import React, { useState, useMemo } from 'react'
import Modal from '~components/Modal'
import { Button, Text, Box, Flex, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useQueryClient } from 'react-query'
import Remove from 'public/assets/img/remove-dispo.svg'
import { Booking } from '~typings/api'
import { format } from '~utils/date'
import differenceInDays from 'date-fns/differenceInDays'
import { client } from '~api/client-api'
import { useCurrentUser } from '~hooks/useCurrentUser'
import useToast from '~hooks/useToast'

interface Props {
  booking: Booking
  type: 'request' | 'booking'
  setSelected: (booking: string) => void
}

const RemoveDispoModal = ({ booking, type, setSelected }: Props) => {
  const { errorToast, successToast } = useToast()
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectedDispos, setSelectedDispos] = useState<string[]>([])
  const { t } = useTranslation('booking')

  const textConfirm = useMemo(() => {
    if (selectedDispos.length === booking?.disponibilities.length)
      return `modal.removedispo.confirmAll${type}`
    return `modal.removedispo.confirm${selectedDispos.length > 1 ? 's' : ''}`
  }, [selectedDispos])

  const disponibilities = useMemo(() => {
    if (!booking?.disponibilities) return []
    return booking.disponibilities.filter(({ status }) => status !== 'removed')
  }, [booking?.disponibilities])

  const updateDispos = () => {
    setLoading(true)
    client.bookings
      .removeDispos(booking?.id, { dispos: selectedDispos })
      .then((res) => {
        setSelectedDispos([])
        queryClient.setQueryData(['booking', booking.id.toString()], res.data)
      })
      .finally(() => setLoading(false))
  }

  const cancelBooking = () => {
    setLoading(true)
    return client.bookings
      .bookingsUpdate(booking?.id, {
        // @ts-ignore
        status:
          user.type === 'place' ? `${type}canceledbyplace` : `requestcanceled`,
      })
      .then(() => {
        queryClient.refetchQueries(['myBookings', type])
        setSelected(null)
        successToast(t('modal.cancel.success'))
      })
      .catch(() => errorToast(t('modal.cancel.error')))
      .finally(() => setLoading(false))
  }

  const onConfirm = async () => {
    if (selectedDispos.length === booking?.disponibilities.length) {
      cancelBooking()
    } else {
      updateDispos()
    }
  }

  if (disponibilities.length <= 1) return null

  return (
    <Modal
      size="lg"
      w="100%"
      button={
        <Button
          w="100%"
          variant="delete"
          leftIcon={<Remove />}
          mt={2.5}
          isLoading={isLoading}
        >
          <Text ml={2}>
            {t(
              `modal.removedispo.${
                type === 'request' ? 'titleRemove' : 'titleCancel'
              }`,
            )}
          </Text>
        </Button>
      }
      title={t(
        `modal.removedispo.${
          type === 'request' ? 'titleRemove' : 'titleCancel'
        }`,
      )}
      onConfirm={onConfirm}
      confirmText={t(textConfirm)}
      closeText={t('modal.removedispo.back')}
      hasHeaderDivider={false}
      isDisabled={selectedDispos.length === 0}
      bodyStyle={{
        px: 0,
      }}
    >
      <Stack pt={5} direction="column" spacing={0.5}>
        {disponibilities.map((dispo, index) => {
          const isSelected = selectedDispos.includes(dispo.id)
          const prevIsSelected =
            index > 0
              ? selectedDispos.includes(disponibilities[index - 1].id)
              : false

          return (
            <Flex
              key={dispo.id}
              px={8}
              w="100%"
              bgColor={isSelected ? 'rgba(187, 36, 36, 0.1)' : 'white'}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                borderTop="1px solid"
                borderColor={
                  isSelected || prevIsSelected ? 'transparent' : 'gray.100'
                }
                py={4}
              >
                <Box color="gray.500">
                  {dispo.type === 'period' ? (
                    <>
                      <Box as="span">
                        {`${format(dispo.start, 'd')} - ${format(
                          dispo.end,
                          'd MMM yyyy',
                        )}`}
                      </Box>
                      <Box pl={1.5} as="span">{`(${
                        differenceInDays(
                          new Date(dispo.end),
                          new Date(dispo.start),
                        ) + 1
                      } jours)`}</Box>
                    </>
                  ) : (
                    <Box>
                      <Flex alignItems="center">
                        <Text>{format(dispo.end, 'd MMM yyyy')}</Text>
                        {dispo.when && (
                          <Text textTransform="lowercase" pl={1.5}>
                            {`(${t(`${dispo.when}`)})`}
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  )}
                </Box>
                <Button
                  variant="line"
                  pb={0}
                  color="red.600"
                  opacity={isSelected ? 0.6 : 1}
                  borderColor="red.600"
                  _hover={{
                    borderColor: 'red.700',
                    color: 'red.700',
                  }}
                  borderBottom={isSelected ? 'none' : '1px solid'}
                  onClick={() => {
                    if (selectedDispos.includes(dispo.id)) {
                      setSelectedDispos(
                        selectedDispos.filter((el) => el !== dispo.id),
                      )
                    } else {
                      setSelectedDispos([...selectedDispos, dispo.id])
                    }
                  }}
                >
                  {t(
                    `modal.removedispo.${
                      isSelected ? 'willBeCanceled' : 'cancel'
                    }`,
                  )}
                </Button>
              </Flex>
            </Flex>
          )
        })}
      </Stack>
    </Modal>
  )
}

export default RemoveDispoModal

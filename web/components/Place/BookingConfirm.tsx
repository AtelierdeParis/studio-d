import React, { useMemo, useState } from 'react'
import { ScheduleEvent } from '~@types/schedule-event.d'
import {
  Heading,
  Box,
  Flex,
  Text,
  Textarea,
  ButtonGroup,
  Button,
  Divider,
  AspectRatio,
} from '@chakra-ui/react'
import { useTranslation, Trans } from 'next-i18next'
import BookingSelection from '~components/Place/BookingSelection'
import BookingConfirmed from '~components/Place/BookingConfirmed'
import FormField from '~components/FormField'
import Link from '~components/Link'
import Image from '~components/Image'
import { ROUTE_USE_POLICY } from '~constants'
import useToast from '~hooks/useToast'
import { Espace } from '~typings/api'
import { client } from '~api/client-api'
import Pin from 'public/assets/img/pin-outline.svg'

interface Props {
  events: ScheduleEvent[]
  place: Espace
  back: () => void
}

const BookingConfirm = ({ events, place, back }: Props) => {
  const { errorToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [isConfirmed, setConfirmed] = useState(false)
  const { t } = useTranslation('place')
  const [message, setMessage] = useState('')
  const isPlural = useMemo(() => (events.length > 1 ? 's' : ''), [events])

  if (isConfirmed)
    return (
      <BookingConfirmed
        structureName={place.users_permissions_user.structureName}
      />
    )

  const onSubmit = () => {
    setLoading(true)
    client.bookings
      .bookingsCreate({
        status: 'pending',
        disponibilities: events.map((event) =>
          event.extendedProps.id.toString(),
        ),
        espace: place.id,
      })
      .then((res) => {
        if (message !== '') {
          return client.messages.messagesCreate({
            author: 'company',
            status: 'message',
            notified: true,
            booking: res.data.id,
            place: place.users_permissions_user.id,
            message,
          })
        }
      })
      .then(() => setConfirmed(true))
      .catch(() => errorToast(t('confirm.error')))
      .finally(() => setLoading(false))
  }

  return (
    <Box
      maxW="container.lg"
      m="0 auto"
      pt={{ base: 0, lg: 12 }}
      px={{ base: 3, lg: 0 }}
    >
      <Heading
        as="h1"
        textStyle="h1"
        mt={{ base: 4, sm: 10 }}
        mb={{ base: 8, sm: 18 }}
        textAlign="center"
      >
        {t('confirm.title')}
      </Heading>
      <Flex direction={{ base: 'column-reverse', lg: 'row' }}>
        <Box pr={{ base: 0, lg: 12 }}>
          <Box px={{ base: 0, lg: 8 }}>
            <FormField label={t('confirm.message.label')}>
              <Textarea
                mt={1}
                placeholder={t('confirm.message.placeholder')}
                resize="none"
                h="180px"
                onChange={(event) => setMessage(event.target.value)}
              />
            </FormField>
            <Text pt={{ base: 6, lg: 10 }} px={{ base: 0, lg: 2 }}>
              <Trans
                i18nKey="place:confirm.textCharte"
                components={{
                  a: (
                    <Link
                      href={ROUTE_USE_POLICY}
                      textDecoration="underline"
                      isExternal
                      color="blue.500"
                    />
                  ),
                }}
              />
            </Text>
          </Box>
          <Flex
            mt={{ base: 2, lg: 10 }}
            layerStyle="blueBox"
            p={{ base: 4, lg: 10 }}
            color="grayText.1"
            direction="column"
          >
            <Text>
              <Trans
                i18nKey="place:confirm.textConfirm"
                values={{
                  name: place.users_permissions_user.structureName,
                }}
                components={{
                  div: <Box as="span" textTransform="capitalize" />,
                }}
              />
            </Text>
            <ButtonGroup
              spacing={5}
              alignSelf="center"
              alignItems="center"
              pt={6}
            >
              <Button
                layerStyle="link"
                variant="unstyled"
                color="grayText.1"
                onClick={() => back()}
              >
                {t('confirm.back')}
              </Button>
              <Button
                size="lg"
                onClick={onSubmit}
                colorScheme="blue"
                isLoading={isLoading}
              >
                {t('confirm.submit')}
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
        <Box minW={{ base: 'auto', lg: '350px' }}>
          <Flex>
            <Box>
              <AspectRatio
                minW="100px"
                ratio={4 / 3}
                flex={1}
                overflow="hidden"
                pos="relative"
                borderRadius="sm"
              >
                <Image
                  src={place.images.length > 0 ? place.images[0].url : ''}
                />
              </AspectRatio>
            </Box>
            <Box pl={{ base: 3, sm: 6 }}>
              <Text
                fontFamily="mabry medium"
                fontWeight="500"
                whiteSpace="pre-line"
              >
                {place.name}
              </Text>
              <Text color="gray.500" whiteSpace="pre-line">
                {place.users_permissions_user.structureName}
              </Text>
              <Flex pt={2}>
                <Box>
                  <Pin width="20px" height="20px" stroke="black" />
                </Box>
                <Text pl={3}>{place.address}</Text>
              </Flex>
            </Box>
          </Flex>
          <Divider my={6} opacity="0.5" />
          <Box>
            <Trans
              i18nKey={`place:confirm.recap${isPlural}`}
              components={{
                b: <b />,
              }}
              values={{
                nb: events.length,
              }}
            />
            <BookingSelection events={events} circleColor="confirm" />
          </Box>
          <Button
            mt={4}
            variant="line"
            onClick={() => back()}
            borderBottomColor="blue.500"
          >
            {t('confirm.change')}
          </Button>
          <Divider
            my={6}
            display={{ base: 'block', lg: 'none' }}
            opacity="0.5"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default BookingConfirm

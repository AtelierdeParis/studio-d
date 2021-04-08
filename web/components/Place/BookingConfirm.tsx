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
import FormField from '~components/FormField'
import Link from '~components/Link'
import Image from '~components/Image'
import { ROUTE_USE_POLICY } from '~constants'
import { Espace } from '~typings/api'
import Pin from 'public/assets/img/pin-outline.svg'

interface Props {
  events: ScheduleEvent[]
  place: Espace
  back: () => void
}

const BookingConfirm = ({ events, place, back }: Props) => {
  const { t } = useTranslation('place')
  const [message, setMessage] = useState('')
  const isPlural = useMemo(() => (events.length > 1 ? 's' : ''), [events])

  const onSubmit = () => {}

  return (
    <Box maxW="container.lg" m="0 auto">
      <Heading as="h1" textStyle="h1" mt={10} mb={18} textAlign="center">
        {t('confirm.title')}
      </Heading>
      <Flex>
        <Box pr={12}>
          <Box px={8}>
            <FormField label={t('confirm.message.label')}>
              <Textarea
                mt={1}
                placeholder={t('confirm.message.placeholder')}
                resize="none"
                h="180px"
                onChange={(event) => setMessage(event.target.value)}
              />
            </FormField>
            <Text pt={10} px={2}>
              <Trans
                i18nKey="place:confirm.textCharte"
                components={{
                  a: (
                    <Link
                      href={ROUTE_USE_POLICY}
                      textDecoration="underline"
                      color="blue.500"
                    />
                  ),
                }}
              />
            </Text>
          </Box>
          <Flex
            mt={10}
            layerStyle="blueBox"
            p={10}
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
            <ButtonGroup spacing={5} alignSelf="center" pt={6}>
              <Button
                variant="unstyled"
                color="grayText.1"
                onClick={() => back()}
              >
                {t('confirm.back')}
              </Button>
              <Button type="submit" colorScheme="blue">
                {t('confirm.submit')}
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <AspectRatio
              w="100px"
              ratio={4 / 3}
              overflow="hidden"
              pos="relative"
              borderRadius="sm"
            >
              <Image src={place.images[0].url || ''} />
            </AspectRatio>
            <Box pl={6}>
              <Text fontFamily="mabry medium" fontWeight="500">
                {place.name}
              </Text>
              <Text color="gray.500" isTruncated>
                {place.users_permissions_user.structureName}
              </Text>
              <Flex pt={2}>
                <Pin width="20px" height="20px" stroke="black" />
                <Text pl={3}>{place.city}</Text>
              </Flex>
            </Box>
          </Flex>
          <Divider my={6} />
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
        </Box>
      </Flex>
    </Box>
  )
}

export default BookingConfirm

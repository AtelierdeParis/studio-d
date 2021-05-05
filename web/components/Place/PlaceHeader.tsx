import React, { useMemo } from 'react'
import { Flex, Button, Text, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import Link from '~components/Link'
import { Espace } from '~typings/api'
import { format } from '~utils/date'
import { useMyPlaces } from '~hooks/useMyPlaces'
import { ROUTE_PLACES } from '~constants'
import Arrow from 'public/assets/img/left-arrow.svg'
import { useCurrentUser } from '~hooks/useCurrentUser'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const BackSearch = ({ hideBackToSearch }) => {
  const { t } = useTranslation('place')
  const prevPath = sessionStorage.getItem('sd-prevPath')

  if (hideBackToSearch) {
    return <Spacer />
  }

  const sentence = useMemo(() => {
    const url = new URL(prevPath, process.env.NEXT_PUBLIC_FRONT_URL)
    const words = []

    const city = url.searchParams.get('city')
    const perimeter = url.searchParams.get('perimeter')
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')

    if (city) {
      words.push(city)

      if (perimeter) {
        words.push(`dans un rayon de ${perimeter} km${startDate ? ',' : ''}`)
      }
    }

    if (startDate) {
      if (endDate) {
        words.push('du')
        words.push(format(startDate, 'dd/MM'))
      } else {
        words.push('le')
        words.push(format(startDate, 'dd MMMM'))
      }
    }
    if (endDate) {
      words.push('au')
      words.push(format(endDate, 'dd/MM'))
    }
    return words.length > 0 ? words.join(' ') : ''
  }, [prevPath])

  return (
    <Flex alignItems="center">
      <Button
        as={Link}
        href={prevPath}
        leftIcon={<Arrow />}
        variant="unstyled"
        display="flex"
        alignItems="center"
        px={0}
      >
        <Text color="black" pl={2}>
          {t('detail.back')}
        </Text>
      </Button>
      {sentence !== '' && (
        <Text pl={4} color="grayText.1" display={{ base: 'none', md: 'block' }}>
          ({capitalize(sentence)})
        </Text>
      )}
    </Flex>
  )
}

const SeeForm = ({ place }) => {
  const { data: places } = useMyPlaces()
  const { t } = useTranslation('place')

  if (!places || !places.some((p) => p.id === place.id)) return null

  return (
    <Button
      ml={5}
      colorScheme="blue"
      as={Link}
      href={{
        pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
        query: { id: place.slug },
      }}
    >
      {t('header.edit')}
    </Button>
  )
}

interface Props {
  place: Espace
}

const PlaceHeader = ({ place }: Props) => {
  const { t } = useTranslation('place')
  const { data: user } = useCurrentUser()
  const prevPath = sessionStorage.getItem('sd-prevPath')

  const hideBackToSearch =
    !prevPath ||
    !prevPath.startsWith(`${ROUTE_PLACES}?`) ||
    prevPath === `${ROUTE_PLACES}?sortBy=dispoAsc`

  if (!Boolean(user) && hideBackToSearch) return null

  return (
    <Flex
      bgColor="blue.50"
      justifyContent="space-between"
      px={5}
      py={2.5}
      alignItems="center"
    >
      {!place.filledUntil ? (
        <Text color="grayText.1">{t(`header.noDispo`)}</Text>
      ) : (
        <BackSearch hideBackToSearch={hideBackToSearch} />
      )}
      {Boolean(user) && <SeeForm place={place} />}
    </Flex>
  )
}

export default PlaceHeader

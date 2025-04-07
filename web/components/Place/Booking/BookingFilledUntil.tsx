import { Box, Flex, Text } from '@chakra-ui/react'
import isAfter from 'date-fns/isAfter'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { Espace } from '~typings/api'
import { format } from '~utils/date'

interface Props {
  start?: Date
  place: Espace
  isMonthlyView?: boolean
}

const BookingFilledUntil = ({ start, place, isMonthlyView = false }: Props) => {
  const [isVisible, setVisible] = useState(false)
  const { t } = useTranslation('place')

  const isAllCampaign = place.disponibilities.every((d) => d.campaign)
  const typeMessage =
    !place.filledUntil || place.disponibilities.length === 0 || isAllCampaign
      ? 'empty'
      : 'default'

  useEffect(() => {
    if (!start && !isMonthlyView) {
      return
    }

    setVisible(
      isAfter(start, new Date(place?.filledUntil)) ||
        place.disponibilities.length === 0 ||
        isAllCampaign,
    )
  }, [start])

  if (!isVisible) {
    return null
  }

  return (
    <Flex
      layerStyle="absoluteFull"
      pt="60px"
      justifyContent="center"
      alignItems="center"
      zIndex={isMonthlyView ? 99 : 1}
      bg={isMonthlyView ? 'rgba(244, 245, 249, 0.8)' : 'transparent'}
    >
      <Flex
        zIndex={99}
        bgColor="#e5e7ed"
        borderRadius="lg"
        py={7}
        px={16}
        maxW="800px"
      >
        <Box maxW="container.md">
          {typeMessage === 'default' ? (
            <Text>
              {t(`detail.filledUntil.title.${typeMessage}`, {
                date: format(place.filledUntil, 'dd/MM/yyyy'),
              })}
            </Text>
          ) : (
            <Text>{t(`detail.filledUntil.title.${typeMessage}`)}</Text>
          )}
          <Text color="grayText.1">
            {t(`detail.filledUntil.text.${typeMessage}`)}
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default BookingFilledUntil

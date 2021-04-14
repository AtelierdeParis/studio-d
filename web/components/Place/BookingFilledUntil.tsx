import React, { useEffect, useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import isAfter from 'date-fns/isAfter'
import { format } from '~utils/date'
import { useTranslation } from 'next-i18next'

const BookingFilledUntil = ({ start, filledUntil }) => {
  const { t } = useTranslation('place')
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (!start) return
    setVisible(isAfter(start, new Date(filledUntil)))
  }, [start])

  if (!isVisible) return null
  return (
    <Flex
      layerStyle="absoluteFull"
      pt="60px"
      justifyContent="center"
      alignItems="center"
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
          <Text>
            {t('detail.filledUntil.title', {
              date: format(filledUntil, 'dd/MM/yyyy'),
            })}
          </Text>
          <Text color="grayText.1">{t('detail.filledUntil.text')}</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default BookingFilledUntil

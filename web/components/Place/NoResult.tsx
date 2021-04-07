import React from 'react'
import { Text, Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

const NoResult = () => {
  const { t } = useTranslation('place')
  const { reset } = useFormContext()

  return (
    <Box textAlign="center" maxW="500px" m="0 auto" mt={20}>
      <Text fontSize="xl" fontFamily="mabry medium" fontWeight="500" pb={3.5}>
        {t('search.noResult.title')}
      </Text>
      <Text pb={4}>{t('search.noResult.text')}</Text>
      <Button
        variant="line"
        onClick={() => {
          reset({
            city: '',
            surface: '',
            mirror: '',
            accomodation: '',
            height: '',
            startDate: '',
            endDate: '',
            floor: '',
            technicalStaff: '',
            danceBar: '',
          })
        }}
      >
        {t('search.noResult.btn')}
      </Button>
    </Box>
  )
}

export default NoResult

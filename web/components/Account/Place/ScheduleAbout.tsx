import React from 'react'
import { updatePlace } from '~api/api'
import { usePlace } from '~hooks/usePlace'
import { useQueryClient } from 'react-query'
import { Box, Textarea } from '@chakra-ui/react'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'

const ScheduleAbout = ({ placeId }) => {
  const { t } = useTranslation('place')
  const { data: place } = usePlace(placeId)
  const queryClient = useQueryClient()

  const saveDetails = (event) => {
    const value = event.currentTarget.value
    if (value === place.scheduleDetails) return
    updatePlace(place.id, { scheduleDetails: value }).then((res) => {
      queryClient.setQueryData(['place', place.id], res.data)
    })
  }
  return (
    <Box mt={8} pt={8} borderTop="1px solid" borderColor="gray.100">
      <FormField
        label={t('schedule.scheduleDetails.label')}
        info={t('schedule.scheduleDetails.info')}
      >
        <Textarea
          mt={1}
          maxH="300px"
          minH="110px"
          placeholder={t('schedule.scheduleDetails.placeholder')}
          onBlur={saveDetails}
        />
      </FormField>
    </Box>
  )
}

export default ScheduleAbout

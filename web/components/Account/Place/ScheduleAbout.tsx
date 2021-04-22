import React from 'react'
import { useQueryClient } from 'react-query'
import { Box, Textarea } from '@chakra-ui/react'
import FormField from '~components/FormField'
import { useTranslation } from 'next-i18next'
import { client } from '~api/client-api'
import { Espace } from '~typings/api'

interface IScheduleAbout {
  place: Espace
}

const ScheduleAbout = ({ place }: IScheduleAbout) => {
  const { t } = useTranslation('place')
  const queryClient = useQueryClient()

  const saveDetails = (event) => {
    const value = event.currentTarget.value
    if (value === place.scheduleDetails) return
    client.espaces
      .espacesUpdate(place.id, { scheduleDetails: value })
      .then((res) => {
        queryClient.setQueryData(['place', place.slug], res.data)
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
          defaultValue={place?.scheduleDetails}
          placeholder={t('schedule.scheduleDetails.placeholder')}
          onBlur={saveDetails}
        />
      </FormField>
    </Box>
  )
}

export default ScheduleAbout

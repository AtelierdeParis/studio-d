import React, { useMemo } from 'react'
import { Select, Flex } from '@chakra-ui/react'
import { useCurrentUser } from '~hooks/useCurrentUser'
import { Control, useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import FormField from '~components/FormField'
import isPast from 'date-fns/isPast'
import isToday from 'date-fns/isToday'

interface Props {
  control: Control
}

const ScheduleDispositif = ({ control }: Props) => {
  const { t } = useTranslation('place')
  const { data: user } = useCurrentUser()
  const { register } = useFormContext()

  const placeDispositifs = useMemo(() => {
    if (!user || !user.placeDispositifs) return []

    return user.placeDispositifs.filter(({ actif, expiration }) => {
      let isExpired = false

      if (
        Boolean(expiration) &&
        isPast(new Date(expiration)) &&
        !isToday(new Date(expiration))
      ) {
        isExpired = true
      }
      return actif === true && !isExpired
    })
  }, [user])

  if (placeDispositifs.length === 0) return null

  return (
    <Flex w="100%">
      <FormField label={t('schedule.dispositif.label')}>
        <Select name="dispositif" ref={register}>
          <option value="">{t('schedule.dispositif.placeholder')}</option>
          {placeDispositifs.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormField>
    </Flex>
  )
}

export default ScheduleDispositif

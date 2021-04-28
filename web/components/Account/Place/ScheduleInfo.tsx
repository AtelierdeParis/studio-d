import React from 'react'
import { Flex, Box, Text, Button, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import ScheduleAbout from '~components/Account/Place/ScheduleAbout'
import { Espace } from '~typings/api'
import useNbDisponibility from '~hooks/useNbDisponibility'
import ScheduleRecap from '~components/Account/Place/ScheduleRecap'

interface Props {
  place: Espace
  showForm: () => void
}

const ScheduleInfo = ({ place, showForm }: Props) => {
  const { t } = useTranslation('place')

  const { nbDispo, available } = useNbDisponibility(place?.disponibilities)
  const isLarge = useBreakpointValue({ base: false, xl: true })
  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <Box w="100%">
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex
          w="100%"
          direction={{ base: 'row', schedule: 'column' }}
          flex={1}
          justifyContent="space-between"
        >
          <Box>
            <Text fontFamily="mabry medium" fontSize="3xl" lineHeight="1">
              {nbDispo}
            </Text>
            <Text>{t(`schedule.slotsFilled${nbDispo > 1 ? 's' : ''}`)}</Text>
            <Text color="gray.400">
              {t(`schedule.available${nbDispo > 1 ? 's' : ''}`, {
                nb: available.length,
              })}
            </Text>
          </Box>
          <Button size="lg" alignSelf="flex-start" mt={6} onClick={showForm}>
            {isMobile ? t(`list.add`) : t(`schedule.add`)}
          </Button>
        </Flex>
        {isLarge && <ScheduleRecap place={place} />}
      </Flex>
      {isLarge && <ScheduleAbout place={place} />}
    </Box>
  )
}

export default ScheduleInfo

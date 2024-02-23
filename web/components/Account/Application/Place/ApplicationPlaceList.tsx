import React, { useEffect, useState } from 'react'
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Divider as ChakraDivider,
  DividerProps,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Application } from '~typings/api'
import Chevron from 'public/assets/img/chevron-down.svg'
import Cell from '~components/Account/Booking/Cell'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import ApplicationPlaceHelper from '~components/Account/Application/Place/ApplicationsHelpers/ApplicationPlaceHelper'
import ApplicationPlaceListItem from '~components/Account/Application/Place/ApplicationPlaceListItem'
import useSelectedCampaign from '~hooks/useSelectedCampaign'

interface Props {
  applications: Application[]
}

const Divider = (props: DividerProps) => (
  <ChakraDivider orientation="vertical" h="24px" mr={2.5} {...props} />
)

const ApplicationPlaceList = ({ applications = [] }: Props) => {
  const { t } = useTranslation('application')
  const [list, setList] = useState<Application[]>([])
  const [isDesc, setDesc] = useState<boolean>(true)
  const { selectedCampaign } = useSelectedCampaign()
  useEffect(() => {
    setList(applications)
    setDesc(true)
  }, [applications])

  const sortByDate = () => {
    setDesc(!isDesc)
    setList(list.reverse())
  }

  return (
    <Box>
      <ApplicationPlaceHelper applications={applications} />
      <SimpleGrid
        gridTemplateColumns={`fit-content(300px) minmax(200px, auto) minmax(auto, auto) minmax(auto, auto)${
          ['preselections', 'closed']?.includes(selectedCampaign?.mode)
            ? 'minmax(auto, auto)'
            : ''
        }`}
        overflowX="auto"
      >
        <Cell isHeader>
          <Text pl="9px">{t('place.table.head.number')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            cursor="pointer"
            onClick={sortByDate}
          >
            <Text color="black">{t('place.table.head.artist')}</Text>
            <Box transform={`rotate(${isDesc ? '0' : '180'}deg)`}>
              <Chevron />
            </Box>
          </Flex>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('place.table.head.email')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('place.table.head.creation')}</Text>
        </Cell>
        {['preselections', 'closed']?.includes(selectedCampaign?.mode) && (
          <Cell isHeader>
            <Divider />
          </Cell>
        )}
        {list.map((application) => (
          <ApplicationPlaceListItem
            key={application.id}
            application={application}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ApplicationPlaceList

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
import ApplicationPlaceListItem from '~components/Account/Application/Place/ApplicationPlaceListItem'
import ApplicationSelector from '~components/Account/Application/Place/ApplicationSelector'

interface Props {
  applications: Application[]
}

const Divider = (props: DividerProps) => (
  <ChakraDivider orientation="vertical" h="24px" mr={2.5} {...props} />
)

const ApplicationPlaceList = ({ applications = [] }: Props) => {
  const { currentCampaign } = useCampaignContext()
  const { t } = useTranslation('application')
  const [list, setList] = useState<Application[]>([])
  const [isDesc, setDesc] = useState<boolean>(true)

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
      <Flex
        alignItems="center"
        pt={{ base: 4, md: 8 }}
        pb={4}
        justifyContent={{ base: 'flex-end', md: 'space-between' }}
      >
        <Text
          textStyle="accountTitle"
          pl={4}
          display={{ base: 'none', md: 'block' }}
          fontSize="24px"
          fontWeight="400"
          fontFamily="mabry"
        >
          {t('place.title', { title: currentCampaign?.title })}
        </Text>
      </Flex>
      <ApplicationSelector />
      <SimpleGrid
        gridTemplateColumns={`fit-content(300px) fit-content(300px) minmax(auto, auto) minmax(auto, auto)${
          currentCampaign?.mode === 'preselections' ? 'minmax(auto, auto)' : ''
        }`}
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
        {currentCampaign?.mode === 'preselections' && (
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

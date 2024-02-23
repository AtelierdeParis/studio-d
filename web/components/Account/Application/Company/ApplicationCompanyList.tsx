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
import ApplicationCompanyListItem from '~components/Account/Application/Company/ApplicationCompanyListItem'
import useCampaignContext from '~components/Campaign/useCampaignContext'
import ApplicationCompanyHelper from '~components/Account/Application/Company/ApplicationsHelpers/ApplicationCompanyHelper'

interface Props {
  applications: Application[]
}

const Divider = (props: DividerProps) => (
  <ChakraDivider orientation="vertical" h="24px" mr={2.5} {...props} />
)

const ApplicationCompanyList = ({ applications = [] }: Props) => {
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
          {t('company.title', { title: currentCampaign?.title })}
        </Text>
      </Flex>
      <SimpleGrid
        gridTemplateColumns="fit-content(300px) minmax(auto, 300px) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) fit-content(300px)"
        overflowX="auto"
      >
        <Cell isHeader>
          <Text pl="9px">{t('company.table.head.number')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('company.table.head.place')}</Text>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('company.table.head.space')}</Text>
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
            <Text color="black">{t('company.table.head.slot')}</Text>
            <Box transform={`rotate(${isDesc ? '0' : '180'}deg)`}>
              <Chevron />
            </Box>
          </Flex>
        </Cell>
        <Cell isHeader>
          <Divider />
          <Text>{t('company.table.head.creation')}</Text>
        </Cell>
        <Cell isHeader>{}</Cell>

        {list.map((application) => (
          <ApplicationCompanyListItem
            key={application.id}
            application={application}
          />
        ))}
      </SimpleGrid>
      <ApplicationCompanyHelper />
    </Box>
  )
}

export default ApplicationCompanyList

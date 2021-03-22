import React from 'react'
import { Tab, TabList } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

const TabPlace = ({ isDisabled, children }) => {
  return (
    <Tab
      px={0}
      mx={2.5}
      isDisabled={isDisabled}
      mb="-1px"
      _selected={{
        color: 'blue.500',
        fontFamily: 'mabry medium',
        borderBottomColor: 'blue.500',
      }}
    >
      {children}
    </Tab>
  )
}

interface IPriceTabList {
  index: number
}
const PriceTabList = ({ index }: IPriceTabList) => {
  const { t } = useTranslation('place')
  return (
    <TabList borderColor="gray.100" borderBottom="1px solid" mb={6}>
      <TabPlace isDisabled={index !== 0}>{t('tabs.info')}</TabPlace>
      <TabPlace isDisabled={index !== 1}>{t('tabs.image')}</TabPlace>
      <TabPlace isDisabled={index !== 2}>{t('tabs.slot', { nb: 0 })}</TabPlace>
    </TabList>
  )
}

export default PriceTabList

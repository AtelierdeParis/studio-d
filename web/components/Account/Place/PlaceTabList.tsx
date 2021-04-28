import React, { useMemo } from 'react'
import { Tab, TabList } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import { DisponibilityStatus } from '~@types/disponibility.d'

const TabPlace = ({ isDisabled, onClick = null, children }) => {
  return (
    <Tab
      px={0}
      mx={2.5}
      isDisabled={isDisabled}
      mb="-1px"
      onClick={onClick}
      _selected={{
        color: 'blue.500',
        fontFamily: 'mabry medium',
        borderBottomColor: 'blue.500',
      }}
      _focus={{ boxShadow: 'none' }}
    >
      {children}
    </Tab>
  )
}

interface Props {
  disabledIndexes?: number[]
  isComplete?: boolean
  place?: Espace
  setIndex?: (index: number) => void
}

const PriceTabList = ({
  disabledIndexes = [],
  place = null,
  isComplete,
  setIndex = null,
}: Props) => {
  const { t } = useTranslation('place')

  const nbAvailable = useMemo(() => {
    if (!place || !place.disponibilities) return 0
    return place.disponibilities.filter(
      (dispo) => dispo.status === DisponibilityStatus.AVAILABLE,
    ).length
  }, [place])

  return (
    <TabList
      borderColor="gray.100"
      borderBottom="1px solid"
      mb={{ base: 2, md: 6 }}
    >
      <TabPlace
        isDisabled={disabledIndexes.includes(0)}
        onClick={() => setIndex(0)}
      >
        {t('tabs.info')}
      </TabPlace>
      <TabPlace
        isDisabled={!isComplete ? true : disabledIndexes.includes(1)}
        onClick={() => setIndex(1)}
      >
        {t('tabs.image')}
      </TabPlace>
      <TabPlace
        isDisabled={!isComplete ? true : disabledIndexes.includes(2)}
        onClick={() => setIndex(2)}
      >
        {t('tabs.slot', { nb: nbAvailable })}
      </TabPlace>
    </TabList>
  )
}

export default PriceTabList

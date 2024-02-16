import React, { useMemo } from 'react'
import { Tab, TabList } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Espace } from '~typings/api'
import { DisponibilityStatus } from '~@types/disponibility.d'
import useCampaignContext from '~components/Campaign/useCampaignContext'

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

const PlaceTabList = ({
  disabledIndexes = [],
  place = null,
  isComplete,
  setIndex = null,
}: Props) => {
  const { isCampaignPlace, currentCampaign } = useCampaignContext()
  const { t } = useTranslation('place')

  const nbAvailable = useMemo(() => {
    if (!place || !place.disponibilities) return 0
    return place.disponibilities.filter(
      (dispo) =>
        dispo.status === DisponibilityStatus.AVAILABLE && !dispo.campaign,
    ).length
  }, [place?.disponibilities])

  const campaignDispo = useMemo(() => {
    if (!place || !place.disponibilities) return 0
    return place.disponibilities.filter(
      //@ts-expect-error
      (dispo) => dispo.campaign === currentCampaign?.id,
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
        {isCampaignPlace
          ? t('tabs.slot_solidarity', { nb: nbAvailable })
          : t('tabs.slot', { nb: nbAvailable })}
      </TabPlace>
      {isCampaignPlace && (
        <TabPlace
          isDisabled={!isComplete ? true : disabledIndexes.includes(3)}
          onClick={() => setIndex(3)}
        >
          {t(
            currentCampaign?.mode === 'disponibilities'
              ? 'tabs.slot_campaign'
              : 'tabs.slot_campaign_applications',
            {
              title: currentCampaign?.title,
              nb: campaignDispo,
              nbTotal: currentCampaign?.disponibilities_max,
            },
          )}
        </TabPlace>
      )}
    </TabList>
  )
}

export default PlaceTabList

import React from 'react'
import { SimpleGrid, Flex, Box, Text, Divider, Tooltip } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import Surface from 'public/assets/img/surface.svg'
import Dimension from 'public/assets/img/dimension.svg'
import Height from 'public/assets/img/height.svg'
import Floor from 'public/assets/img/floor.svg'
import Carpet from 'public/assets/img/carpet.svg'
import Mirror from 'public/assets/img/mirror.svg'
import { capitalize } from '~utils/string'
import DanceBar from 'public/assets/img/danceBar.svg'
import Staff from 'public/assets/img/staff.svg'
import Bed from 'public/assets/img/accomodation.svg'
import { useTranslation } from 'next-i18next'

interface Props {
  place: Espace
  displayPrecise: boolean
}

const GridItem = ({ icon, label, text, withDivider = false }) => (
  <Flex alignItems="flex-start">
    {withDivider && <Divider orientation="vertical" opacity={0.4} mr={3.5} />}
    <Box w="25px" mt={1}>
      {icon}
    </Box>
    <Box pl={4} overflow="hidden" pr={1}>
      <Text color="gray.500">{label}</Text>
      <Text isTruncated>{text}</Text>
    </Box>
  </Flex>
)

const PlaceAttributesGrid = ({ place, displayPrecise }: Props) => {
  const { t } = useTranslation('place')

  return (
    <>
      {displayPrecise && <Text fontSize="sm">{t('detail.precise')}</Text>}
      <SimpleGrid pt={8} columns={3} rowGap={5}>
        <GridItem
          label={t('detail.surface')}
          icon={<Surface />}
          text={`${place?.surface}m²`}
        />
        <GridItem
          withDivider
          label={t('detail.floor')}
          icon={<Floor />}
          text={
            place?.floor !== 'other' ? (
              t(`detail.${place?.floor}`)
            ) : (
              <Tooltip label={capitalize(place?.otherFloor)}>
                {capitalize(place?.otherFloor)}
              </Tooltip>
            )
          }
        />
        <GridItem
          withDivider
          label={t('detail.danceBar')}
          icon={<DanceBar />}
          text={place?.danceBar ? t('detail.yes') : t('detail.no')}
        />
        <GridItem
          label={t('detail.dimension')}
          icon={<Dimension />}
          text={`${place?.roomLength} x ${place?.width} m`}
        />
        <GridItem
          withDivider
          label={t('detail.danceCarpet')}
          icon={<Carpet />}
          text={t(`detail.${place?.danceCarpet}`)}
        />
        <GridItem
          withDivider
          label={t('detail.technicalStaff')}
          icon={<Staff />}
          text={place?.technicalStaff ? t('detail.possible') : t('detail.no')}
        />
        <GridItem
          label={t('detail.height')}
          icon={<Height />}
          text={`${place?.height}m`}
        />
        <GridItem
          withDivider
          label={t('detail.mirror')}
          icon={<Mirror />}
          text={place?.mirror ? t('detail.yes') : t('detail.no')}
        />
        <GridItem
          withDivider
          label={t('detail.accomodation')}
          icon={<Bed />}
          text={place?.accomodation ? t('detail.possible') : t('detail.no')}
        />
      </SimpleGrid>
    </>
  )
}

export default PlaceAttributesGrid

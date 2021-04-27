import React from 'react'
import { SimpleGrid, Flex, Box, Text } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import Surface from 'public/assets/img/surface.svg'
import Dimension from 'public/assets/img/dimension.svg'
import Height from 'public/assets/img/height.svg'
import Floor from 'public/assets/img/floor.svg'
import Carpet from 'public/assets/img/carpet.svg'
import Mirror from 'public/assets/img/mirror.svg'
import DanceBar from 'public/assets/img/danceBar.svg'
import Staff from 'public/assets/img/staff.svg'
import Bed from 'public/assets/img/accomodation.svg'
import { useTranslation } from 'next-i18next'

interface Props {
  place: Espace
}

const GridItem = ({ icon, label, text, withDivider = false }) => (
  <>
    <Box
      py={3}
      h="100%"
      pl={2}
      borderBottom="1px solid"
      borderColor={withDivider ? 'gray.100' : 'transparent'}
    >
      <Flex h="20px" alignItems="center">
        {icon}
      </Flex>
    </Box>
    <Flex
      pl={3}
      h="100%"
      borderBottom="1px solid"
      borderColor={withDivider ? 'gray.100' : 'transparent'}
      alignItems="center"
    >
      <Text color="gray.500">{label}</Text>
    </Flex>
    <Flex
      pl={5}
      h="100%"
      borderBottom="1px solid"
      borderColor={withDivider ? 'gray.100' : 'transparent'}
      alignItems="center"
    >
      <Text>{text}</Text>
    </Flex>
  </>
)

const PlaceAttributesGrid = ({ place }: Props) => {
  const { t } = useTranslation('place')

  return (
    <>
      <Text py={6} fontSize="sm">
        {t('detail.precise')}
      </Text>
      <SimpleGrid
        columns={{ base: 3 }}
        rowGap={0}
        alignItems="center"
        gridTemplateColumns="fit-content(25px) fit-content(200px) minmax(auto, auto)"
      >
        <GridItem
          withDivider
          label={t('detail.surface')}
          icon={<Surface />}
          text={`${place?.surface}m²`}
        />
        <GridItem
          withDivider
          label={t('detail.floor')}
          icon={<Floor />}
          text={t(`detail.${place?.floor}`)}
        />
        <GridItem
          withDivider
          label={t('detail.danceBar')}
          icon={<DanceBar />}
          text={place?.danceBar ? t('detail.yes') : t('detail.no')}
        />
        <GridItem
          withDivider
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
          text={place?.technicalStaff ? t('detail.available') : t('detail.no')}
        />
        <GridItem
          withDivider
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
          label={t('detail.accomodation')}
          icon={<Bed />}
          text={place?.accomodation ? t('detail.available') : t('detail.no')}
        />
      </SimpleGrid>
    </>
  )
}

export default PlaceAttributesGrid

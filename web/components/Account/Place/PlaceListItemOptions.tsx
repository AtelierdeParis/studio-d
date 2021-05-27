import React, { useMemo } from 'react'
import UnpublishModal from '~components/Account/Place/UnpublishModal'
import PublishModal from '~components/Account/Place/PublishModal'
import DeletePlaceModal from '~components/Account/Place/DeletePlaceModal'
import {
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  Button,
  Flex,
} from '@chakra-ui/react'
import Dots from 'public/assets/img/dots.svg'
import { ROUTE_PLACE_DETAIL } from '~constants'
import { useTranslation } from 'next-i18next'
import useNbBooking from '~hooks/useNbBooking'
import Arrow from 'public/assets/img/circle-arrow.svg'
import Link from '~components/Link'

const PlaceListItemOptions = ({ place }) => {
  const { t } = useTranslation('place')
  const { coming, pending } = useNbBooking(place.disponibilities)
  const isMobile = useBreakpointValue({ base: true, xl: false })

  const hasBookingInFuture = useMemo(
    () => coming.length > 0 || pending.length > 0,
    [coming, pending],
  )

  if (isMobile) {
    return (
      <Menu>
        <MenuButton>
          <Dots />
        </MenuButton>
        <MenuList fontSize="md">
          {place.published ? (
            <>
              <MenuItem as="div" p="0">
                <UnpublishModal place={place} />
              </MenuItem>
              <MenuDivider />
              <MenuItem as="div" p="0">
                <Link
                  px={3}
                  py={1.5}
                  w="100%"
                  href={{
                    pathname: ROUTE_PLACE_DETAIL,
                    query: { id: place.slug },
                  }}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    variant="line"
                    _hover={{ borderColor: 'transparent' }}
                    borderColor={{ base: 'transparent', lg: 'black' }}
                  >
                    {t('list.openWebpage')}
                  </Button>
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              {place.filledUntil && (
                <>
                  <MenuItem as="div" p="0">
                    <PublishModal placeId={place.id} />
                  </MenuItem>
                  <MenuDivider />
                </>
              )}
              <MenuItem as="div" p="0">
                <DeletePlaceModal placeId={place.id} />
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    )
  }

  if (place.published) {
    return (
      <Flex>
        {!hasBookingInFuture && <UnpublishModal place={place} />}
        <Link
          ml={5}
          display={{ base: 'none', lg: 'block' }}
          href={{
            pathname: ROUTE_PLACE_DETAIL,
            query: { id: place.slug },
          }}
        >
          <Arrow />
        </Link>
      </Flex>
    )
  }

  return (
    <ButtonGroup spacing={4} alignSelf="flex-start">
      {place.filledUntil && <PublishModal placeId={place.id} />}
      <DeletePlaceModal placeId={place.id} />
    </ButtonGroup>
  )
}

export default PlaceListItemOptions

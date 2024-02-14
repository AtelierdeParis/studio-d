import React from 'react'
import dynamic from 'next/dynamic'
import OtherPlaces from '~components/Place/OtherPlaces'
import PlaceItinerary from '~components/Place/PlaceItinerary'
import { Espace } from '~typings/api'

const Map = dynamic(() => import('~components/Map'), { ssr: false })

const PlaceDetailLocation = ({ place }: { place: Espace }) => {
  return (
    <>
      <PlaceItinerary place={place} />
      <Map
        mt={10}
        w="100%"
        h="370px"
        icon={{
          iconUrl: '/assets/img/pin.svg',
          iconSize: [42, 42],
        }}
        markers={[
          {
            id: place?.id,
            latitude: place?.latitude,
            longitude: place?.longitude,
          },
        ]}
      />
      {place?.users_permissions_user?.id && (
        <OtherPlaces userId={place?.users_permissions_user?.id} />
      )}
    </>
  )
}

export default PlaceDetailLocation

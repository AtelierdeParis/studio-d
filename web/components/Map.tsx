import React, { useRef, useEffect, useMemo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  FeatureGroup,
} from 'react-leaflet'
import { GeoJsonObject } from 'geojson'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface IMarker {
  latitude: string
  longitude: string
  isFocus: boolean
  id?: string
  icon?: Leaflet.IconOptions
  onMarkerClick: (id: string) => void
}

const defaultIcon = (isFocus = false): Leaflet.IconOptions => ({
  iconUrl: isFocus ? '/assets/img/pin.svg' : '/assets/img/pin-blue.svg',
  iconSize: [32, 32],
})

const Marker = ({
  latitude,
  longitude,
  id,
  isFocus,
  icon: iconProp,
  onMarkerClick,
}: IMarker) => {
  const icon = Leaflet.icon(iconProp || defaultIcon(isFocus))

  const markerRef = useRef(null)

  const geojsonData: GeoJsonObject = useMemo(
    () => ({
      type: 'Feature' as 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: [latitude, longitude] },
    }),
    [latitude, longitude],
  )

  return (
    <GeoJSON
      key={latitude + longitude + id + isFocus}
      ref={markerRef}
      data={geojsonData}
      onEachFeature={(feature, layer) => {
        layer.on({
          click: () => onMarkerClick(id),
        })
      }}
      pointToLayer={(feature, latlng) => {
        return Leaflet.marker(latlng, {
          icon,
        })
      }}
      style={{ fillColor: '#E84E10' }}
    />
  )
}

const MapContent = ({ children, markers }) => {
  const map = useMap()
  const groupRef = useRef(null)

  useEffect(() => {
    if (groupRef.current && markers.length > 0) {
      map.fitBounds(groupRef.current.getBounds())
    }
  }, [groupRef, markers])

  return <FeatureGroup ref={groupRef}>{children}</FeatureGroup>
}

interface IMap extends BoxProps {
  markers: {
    id?: string
    latitude: string
    longitude: string
  }[]
  focusedPlace?: string
  icon?: Leaflet.IconOptions
  zoomControl?: boolean
  onMarkerClick?: (id: string) => void
}

const Map = ({
  markers = [],
  focusedPlace,
  icon,
  zoomControl = true,
  onMarkerClick,
  ...rest
}: IMap) => {
  return (
    <Box {...rest}>
      <MapContainer
        center={null}
        zoom={null}
        zoomControl={zoomControl}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', flexGrow: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
          id="mapbox/light-v10"
        />
        <MapContent markers={markers}>
          {markers.map(({ latitude, longitude, id = '' }) => (
            <Marker
              id={id}
              icon={icon}
              isFocus={id === focusedPlace}
              latitude={latitude}
              longitude={longitude}
              key={latitude + longitude + id}
              onMarkerClick={onMarkerClick}
            />
          ))}
        </MapContent>
      </MapContainer>
    </Box>
  )
}

export default Map

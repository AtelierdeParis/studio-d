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
}

const Marker = ({ latitude, longitude, id, isFocus }: IMarker) => {
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
      pointToLayer={(feature, latlng) => {
        return Leaflet.marker(latlng, {
          icon: Leaflet.icon({
            iconUrl: isFocus
              ? '/assets/img/pin.png'
              : '/assets/img/blue-pin.png',
            iconSize: [30, 30],
          }),
        })
      }}
      style={{ fillColor: 'blue' }}
    />
  )
}

const MapContent = ({ children, markers }) => {
  const map = useMap()
  const groupRef = useRef(null)

  useEffect(() => {
    if (groupRef.current) {
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
}

const Map = ({ markers = [], focusedPlace, ...rest }: IMap) => {
  return (
    <Box {...rest}>
      <MapContainer
        center={null}
        zoom={null}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', flexGrow: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapContent markers={markers}>
          {markers.map(({ latitude, longitude, id = '' }) => (
            <Marker
              id={id}
              isFocus={id === focusedPlace}
              latitude={latitude}
              longitude={longitude}
              key={latitude + longitude + id}
            />
          ))}
        </MapContent>
      </MapContainer>
    </Box>
  )
}

export default Map

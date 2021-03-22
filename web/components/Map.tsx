import React, { useRef, useEffect, useMemo } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { GeoJsonObject } from 'geojson'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface IMarker {
  latitude: string
  longitude: string
}

const Marker = ({ latitude, longitude }: IMarker) => {
  const markerRef = useRef(null)
  const map = useMap()
  useEffect(() => {
    if (markerRef.current) {
      const bounds = markerRef.current.getBounds()
      if (Object.keys(bounds).length === 0) return null
      map.fitBounds(bounds, {
        maxZoom: 14,
      })
    }
  }, [markerRef])

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
      key="test"
      ref={markerRef}
      data={geojsonData}
      pointToLayer={(feature, latlng) => {
        return Leaflet.marker(latlng, {
          icon: Leaflet.icon({
            iconUrl: '/assets/img/pin.png',
            iconSize: [30, 30],
          }),
        })
      }}
      style={{ fillColor: 'blue' }}
    />
  )
}

interface IMap extends BoxProps {
  latitude: string
  longitude: string
}

const Map = ({ latitude, longitude, ...rest }: IMap) => {
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
        <Marker latitude={latitude} longitude={longitude} />
      </MapContainer>
    </Box>
  )
}

export default Map

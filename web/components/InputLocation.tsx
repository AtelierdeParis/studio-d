import React from 'react'
import AsyncSelect from 'react-select/async'
import { useTheme } from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'
import axios from 'axios'
import geocodingService from '@mapbox/mapbox-sdk/services/geocoding'
import mbxClient from '@mapbox/mapbox-sdk'

const getStyle = (theme) => {
  return {
    control: (styles) => ({
      ...styles,
      border: `1px solid ${theme.colors.gray['100']}`,
      borderRadius: theme.radii.xs,
      padding: theme.space['2'],
      flexWrap: 'wrap',
      alignItems: 'center',
      ':hover': {
        borderColor: theme.colors.gray['300'],
      },
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    loadingIndicator: () => ({
      display: 'none',
    }),
  }
}

interface Props {
  name: string
  placeholder?: string
  control: Control
}

const InputLocation = ({ name, control, placeholder }: Props) => {
  const baseClient = mbxClient({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  })
  const geocoder = geocodingService(baseClient)
  const theme = useTheme()
  const { field } = useController({
    name,
    control,
  })

  const { field: latitude } = useController({
    name: 'latitude',
    control,
  })
  const { field: longitude } = useController({
    name: 'longitude',
    control,
  })
  const { field: city } = useController({
    name: 'city',
    control,
  })
  const { field: country } = useController({
    name: 'country',
    control,
  })

  const onChange = (value) => {
    field.onChange(value?.label || '')

    if (value?.item?.geometry?.coordinates) {
      latitude.onChange(value?.item.geometry.coordinates[0])
      longitude.onChange(value?.item.geometry.coordinates[1])
      const cityAttr = value?.item.context.find(({ id }) =>
        id.startsWith('place'),
      )
      const countryAttr = value?.item.context.find(({ id }) =>
        id.startsWith('country'),
      )
      if (cityAttr) {
        city.onChange(cityAttr.text)
      }
      if (countryAttr) {
        country.onChange(countryAttr.text)
      }
    } else {
      latitude.onChange(null)
      longitude.onChange(null)
      city.onChange(null)
      country.onChange(null)
    }
  }

  const loadOptions = (inputValue) => {
    return geocoder
      .forwardGeocode({
        query: inputValue,
      })
      .send()
      .then((res) => {
        if (!res.body.features || res.body.features.length === 0) return null
        return res.body.features.map((item) => ({
          value: item.place_name,
          label: item.place_name,
          item,
        }))
      })
  }

  return (
    <AsyncSelect
      placeholder={placeholder}
      name={name}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={getStyle(theme)}
      loadOptions={loadOptions}
      defaultInputValue={field.value}
      isClearable
      onChange={onChange}
      noOptionsMessage={() => null}
    />
  )
}

export default InputLocation

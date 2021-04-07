import React from 'react'
import AsyncSelect from 'react-select/async'
import { useTheme } from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'
import axios from 'axios'

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

  const onChange = (value) => {
    field.onChange(value?.label || '')

    if (value?.item?.geometry?.coordinates) {
      latitude.onChange(value?.item.geometry.coordinates[0])
      longitude.onChange(value?.item.geometry.coordinates[1])
      city.onChange(value?.item.properties.city)
    } else {
      latitude.onChange(null)
      longitude.onChange(null)
      city.onChange(null)
    }
  }

  const loadOptions = (inputValue) => {
    return axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${inputValue}`)
      .then((res) => {
        return res.data?.features.map((item) => ({
          value: item.properties.label,
          label: item.properties.label,
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

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
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      margin: theme.space['1'],
      border: '1px solid',
      borderColor: theme.colors.gray['100'],
      borderRadius: theme.radii.md,
      paddingTop: theme.space['1'],
      paddingBottom: theme.space['1'],
      paddingLeft: theme.space['4'],
      paddingRight: theme.space['4'],
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: theme.fontSizes['xs'],
      letterSpacing: theme.letterSpacings['wide'],
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      fontSize: '12px',
      marginLeft: theme.space['1.5'],
      padding: 0,
      '> svg': {
        height: '18px',
        width: '18px',
      },
      cursor: 'pointer',
      ':hover': {
        color: theme.colors.gray['600'],
      },
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

  const onChange = (value) => {
    field.onChange(value?.label || '')

    if (value?.item?.geometry?.coordinates) {
      latitude.onChange(value?.item.geometry.coordinates[0])
      longitude.onChange(value?.item.geometry.coordinates[1])
    } else {
      latitude.onChange(null)
      longitude.onChange(null)
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

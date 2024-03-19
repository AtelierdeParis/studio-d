import React from 'react'
import Select from 'react-select'
import { useTheme, Box } from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'
import { useCities } from '~hooks/useCities'
import Remove from 'public/assets/img/remove.svg'

const getStyle = (theme) => {
  return {
    control: (styles, state) => ({
      ...styles,
      width: '100%',
      padding: 0,
      backgroundColor: 'transparent',
      border: `1px solid transparent`,
      borderRadius: theme.radii.xs,
      minHeight: '12px',
      height: '26px',
      flexWrap: 'wrap',
      alignItems: 'center',
      cursor: 'pointer',
      ...(state.isFocused && {
        border: `1px solid ${theme.colors.blue['500']}!important`,
        boxShadow: '0 0 0 2px rgb(95 105 162 / 27%)',
      }),
      ':hover': {
        borderColor: 'transparent',
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      padding: '0 3px',
    }),
    placeholder: (styles) => ({
      ...styles,
      lineHeight: 1,
      textTransform: 'none',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      height: '100%',
      textTransform: 'capitalize',
    }),
    clearIndicator: (styles) => ({
      ...styles,
      padding: 0,
    }),
    option: (styles) => ({
      ...styles,
      textTransform: 'capitalize',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    input: (styles) => ({
      ...styles,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: '1!important',
    }),
    singleValue: (provided, state) => {
      return { ...provided, opacity: 1 }
    },
  }
}

const ClearIndicator = (props) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props
  return (
    <Box
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      cursor="pointer"
    >
      <Remove />
    </Box>
  )
}

interface Props {
  name: string
  placeholder?: string
  control: Control
}

const InputCity = ({ name, control, placeholder }: Props) => {
  const { data: cities } = useCities()
  const theme = useTheme()
  const { field } = useController({
    name,
    control,
  })

  const onChange = (value) => {
    field.onChange(value?.label || '')
  }

  return (
    <Select
      placeholder={placeholder}
      name={name}
      options={cities}
      components={{ ClearIndicator }}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={getStyle(theme)}
      value={field.value && { label: field.value, value: field.value }}
      isClearable
      onChange={onChange}
      noOptionsMessage={() => 'Aucun résultat'}
    />
  )
}

export default InputCity

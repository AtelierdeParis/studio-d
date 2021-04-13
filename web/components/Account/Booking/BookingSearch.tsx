import React, { useMemo } from 'react'
import Search from 'public/assets/img/search.svg'
import { Booking } from '~typings/api'
import { Input, InputGroup, InputRightElement, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'

interface Props {
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
}

const colourStyles = {
  container: (styles) => ({
    ...styles,
    width: '100%',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  noOptionsMessage: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (styles, state) => ({
    ...styles,
    paddingRight: '40px',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '500px',
    ...(state.isFocused && {
      border: `1px solid #283583!important`,
      boxShadow: '0 0 0 2px rgb(95 105 162 / 27%)',
    }),
    ':hover': {
      borderColor: 'transparent',
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
    }
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#283583',
      color: 'white',
    }
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'transparent',
    },
  }),
}

const BookingSearch = ({ bookings }: Props) => {
  const { t } = useTranslation('booking')
  const { options } = useMemo(() => {
    return bookings.reduce(
      (total, { disponibilities }) => {
        const place =
          disponibilities.length > 0 ? disponibilities[0].espace : null
        if (place) {
          if (!total.values.includes(place.name)) {
            total.values.push(place.name)
            total.options.push({
              value: place.name,
              label: place.name,
            })
          }
        }
        return total
      },
      {
        values: [],
        options: [],
      },
    )
  }, [bookings])
  console.log(options)

  return (
    <Flex minW="300px">
      <InputGroup size="md">
        <Select
          isMulti
          name="colors"
          placeholder={t('search')}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          styles={colourStyles}
        />
        <InputRightElement h="100%" children={<Search />} />
      </InputGroup>
    </Flex>
  )
}

export default BookingSearch

import React, { useMemo } from 'react'
import Search from 'public/assets/img/search.svg'
import { Booking } from '~typings/api'
import { InputGroup, InputRightElement, Flex } from '@chakra-ui/react'
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
  valueContainer: (styles) => ({
    ...styles,
    padding: '2px 8px 2px 3px',
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
  }),
  option: (styles, { isDisabled }) => {
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
  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: 'transparent',
    },
  }),
}

const BookingSearch = ({ bookings, setBookings }: Props) => {
  const { t } = useTranslation('booking')
  const { options } = useMemo(() => {
    return bookings.reduce(
      (total, { espace }) => {
        if (!total.values.includes(espace.name)) {
          total.values.push(espace.name)
          total.options.push({
            value: espace.name,
            label: espace.name,
          })
        }
        return total
      },
      {
        values: [],
        options: [],
      },
    )
  }, [bookings])

  const onChange = (data) => {
    if (data.length === 0) {
      return setBookings(bookings)
    }
    const values = data.map((val) => val.value)

    setBookings(
      bookings.filter((booking) => {
        return values.includes(booking.espace.name)
      }),
    )
  }

  return (
    <Flex minW={{ base: '100%', sm: '300px' }}>
      <InputGroup size="md">
        <Select
          isMulti
          name="colors"
          placeholder={t('search')}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          styles={colourStyles}
          onChange={onChange}
        />
        <InputRightElement h="100%" children={<Search />} />
      </InputGroup>
    </Flex>
  )
}

export default BookingSearch

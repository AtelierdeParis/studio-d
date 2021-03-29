import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Box, Input } from '@chakra-ui/react'
import fr from 'date-fns/locale/fr'
import { useController, Control } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

const CustomInput = forwardRef(({ value, onClick, isDisabled }, ref) => {
  return (
    <Input
      isDisabled={isDisabled}
      autoComplete="off"
      onClick={onClick}
      onChange={() => null}
      ref={ref}
      value={value}
      w="100%"
    />
  )
})

interface IInputDate {
  name: string
  control: Control
  minDate?: Date
  maxDate?: Date
  isDisabled?: boolean
  excludeDates?: Date[]
}

const InputDate = ({
  name,
  control,
  minDate = null,
  maxDate = null,
  isDisabled = false,
  excludeDates = [],
}: IInputDate) => {
  const { field } = useController({
    name,
    control,
  })
  return (
    <Box w="100" className="studiod-date">
      <DatePicker
        dateFormat="dd/MM/yyyy"
        style={{ width: '100%' }}
        selected={field.value}
        onChange={(date) => field.onChange(date)}
        customInput={<CustomInput isDisabled={isDisabled} />}
        locale={fr}
        minDate={minDate}
        maxDate={maxDate}
        disabled={isDisabled}
        excludeDates={excludeDates}
      />
    </Box>
  )
}

export default InputDate

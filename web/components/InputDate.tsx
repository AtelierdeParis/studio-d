import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Box, Input } from '@chakra-ui/react'
import fr from 'date-fns/locale/fr'
import { useController, Control } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

interface ICustomInput {
  value?: string
  placeholder?: string
  onClick?: () => void
  isDisabled?: boolean
}

const CustomInput = forwardRef(
  ({ value, onClick, isDisabled, placeholder }: ICustomInput, ref) => {
    return (
      <Input
        isDisabled={isDisabled}
        autoComplete="off"
        onClick={onClick}
        onChange={() => null}
        placeholder={placeholder}
        // @ts-ignore
        ref={ref}
        value={value}
        w="100%"
      />
    )
  },
)

interface IInputDate {
  name: string
  placeholder?: string
  control?: Control
  minDate?: Date
  maxDate?: Date
  isDisabled?: boolean
  excludeDates?: Date[]
  defaultValue?: Date
  onChange?: (date: Date) => void
}

const InputDate = ({
  name,
  control,
  minDate = null,
  maxDate = null,
  isDisabled = false,
  excludeDates = [],
  placeholder,
  defaultValue,
  onChange = null,
}: IInputDate) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <Box w="100" className="studiod-date">
      <DatePicker
        dateFormat="dd/MM/yyyy"
        style={{ width: '100%' }}
        selected={field.value}
        onChange={(date) => {
          field.onChange(date)
          if (onChange) onChange(date)
        }}
        placeholderText={placeholder}
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

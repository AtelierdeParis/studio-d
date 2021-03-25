import React, { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Box, Input } from '@chakra-ui/react'
import fr from 'date-fns/locale/fr'
import { useController, Control } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Input
    onClick={onClick}
    onChange={() => null}
    ref={ref}
    value={value}
    w="100%"
  />
))

interface IInputDate {
  name: string
  control: Control
}

const InputDate = ({ name, control }: IInputDate) => {
  const { field } = useController({
    name,
    control,
  })
  return (
    <Box w="100" className="studiod-date">
      <DatePicker
        style={{ width: '100%' }}
        selected={field.value}
        onChange={(date) => field.onChange(date)}
        customInput={<CustomInput />}
        locale={fr}
      />
    </Box>
  )
}

export default InputDate

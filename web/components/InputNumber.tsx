import React from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
} from '@chakra-ui/react'
import { useController, Control } from 'react-hook-form'

interface IInputNumber extends NumberInputProps {
  control: Control
}

const InputNumber = ({ control, name, ...rest }: IInputNumber) => {
  const { field } = useController({
    name,
    control,
  })

  return (
    <NumberInput
      min={0.1}
      max={9999}
      step={1}
      {...rest}
      onChange={field.onChange}
      value={field.value}
    >
      <NumberInputField
        border="1px solid"
        borderColor="gray.100"
        borderRadius="xs"
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 2px rgb(95 105 162 / 27%)',
        }}
        _invalid={{
          borderColor: 'red.500',
          boxShadow: '0 0 0 2px rgb(229 62 62 / 20%)',
        }}
        h="45px"
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export default InputNumber

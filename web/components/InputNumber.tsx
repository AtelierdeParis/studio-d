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
      max={100}
      step={1}
      {...rest}
      onChange={field.onChange}
    >
      <NumberInputField
        borderRadius="xs"
        border="1px solid"
        borderColor="gray.100"
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

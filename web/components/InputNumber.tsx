import React from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
} from '@chakra-ui/react'

interface IInputNumber extends NumberInputProps {
  register: () => void
}

const InputNumber = ({ register, name, ...rest }: IInputNumber) => {
  return (
    <NumberInput
      //   inputMode="decimal"
      name={name}
      min={0.1}
      max={100}
      step={1}
      {...rest}
    >
      <NumberInputField
        ref={register}
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

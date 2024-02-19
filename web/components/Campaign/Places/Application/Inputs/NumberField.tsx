import { NumberInputProps } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

const NumberField = ({
  label,
  name,
  ...props
}: { label: string; name: string } & NumberInputProps) => {
  const { errors, control } = useFormContext()

  const { field } = useController({
    name,
    control,
  })

  const onChange = (value) => {
    field.onChange(value)
  }

  return (
    <FormField label={label} errors={errors[name]} flex={1}>
      <NumberInput onChange={onChange} value={field.value} {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormField>
  )
}

export default NumberField

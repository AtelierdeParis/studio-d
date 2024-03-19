import { Input, InputProps, Text } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'

const TextField = ({
  label,
  name,
  ...props
}: { label: string; name: string } & InputProps) => {
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
      <Input onChange={onChange} value={field?.value} {...props} />
    </FormField>
  )
}

export default TextField

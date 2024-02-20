import { Checkbox, InputProps } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import { ReactNode } from 'react-markdown'
import FormField from '~components/FormField'

const CheckboxField = ({
  label,
  name,
  ...props
}: { label: string; name: string } & InputProps) => {
  const { errors, control } = useFormContext()

  const { field } = useController({
    name,
    control,
  })

  const onChange = (e) => {
    field.onChange(e.target.checked)
  }

  return (
    <FormField errors={errors[name]} flex={1}>
      <Checkbox
        onChange={onChange}
        value={field?.value}
        color={errors[name] ? 'red.500' : undefined}
        {...props}
      >
        {label}
      </Checkbox>
    </FormField>
  )
}

export default CheckboxField

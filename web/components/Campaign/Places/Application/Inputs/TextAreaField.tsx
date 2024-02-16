import { Textarea, TextareaProps } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import FormField from '~components/FormField'

const TextAreaField = ({
  label,
  name,
  helper,
  ...props
}: { label: string; name: string; helper?: string } & TextareaProps) => {
  const { errors, control } = useFormContext()

  const { field } = useController({
    name,
    control,
  })

  const onChange = (value) => {
    field.onChange(value)
  }

  return (
    <FormField label={label} errors={errors[name]} flex={1} helper={helper}>
      <Textarea onChange={onChange} size="lg" {...props} />
    </FormField>
  )
}

export default TextAreaField

import { useController, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import FormField from '~components/FormField'
import theme from '~theme'

const InputMultiSelect = ({
  label,
  name,
  placeholder,
  options,
  isDisabled = false,
}: {
  label: string
  name: string
  placeholder: string
  options: { label: string; value: string | number }[]
  isDisabled?: boolean
}) => {
  const { errors, control } = useFormContext()

  const { field } = useController({
    name,
    control,
  })

  const onChange = (value) => {
    field.onChange(value?.map((el) => el.value) || [])
  }

  return (
    <FormField label={label} errors={errors[name]} flex={1}>
      <Select
        placeholder={placeholder}
        name={name}
        isMulti
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        isClearable
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: 45,
            borderColor: errors[name]
              ? 'red!important'
              : theme.colors.gray['200'] + '!important',
          }),
        }}
        onChange={onChange}
        isDisabled={isDisabled}
        value={options?.filter((el) => field.value?.includes(el.value))}
      />
    </FormField>
  )
}

export default InputMultiSelect

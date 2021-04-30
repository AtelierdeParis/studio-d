import React from 'react'
import { Select, SelectProps, Box } from '@chakra-ui/react'
import { useController, Control, useFormContext } from 'react-hook-form'
import Remove from 'public/assets/img/remove.svg'

interface Props extends SelectProps {
  control: Control
  children: React.ReactNode
}

const SearchSelect = ({ control, children, name, ...rest }: Props) => {
  const form = useFormContext()
  const { field } = useController({ name, control })

  const handleChange = (value) => {
    field.onChange(value)
  }

  return (
    <Box pos="relative">
      <Select
        fontSize={{ base: 'sm', sm: 'md' }}
        value={field.value}
        name={name}
        {...rest}
        color="gray.500"
        {...(Boolean(field.value) && {
          icon: <Remove />,
          color: 'blue.500',
        })}
        onChange={(event) => handleChange(event.target.value)}
      >
        {children}
      </Select>
      {Boolean(field.value) && (
        <Box
          pos="absolute"
          right="0"
          top="0"
          bottom="0"
          w="30px"
          cursor="pointer"
          onClick={() => {
            form.reset({
              ...form.getValues(),
              [name]: '',
            })
            // handleChange('')
          }}
        />
      )}
    </Box>
  )
}

export default SearchSelect

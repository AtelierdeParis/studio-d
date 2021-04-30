import { FieldError } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Text,
  Box,
  FormControlProps,
  StyleProps,
} from '@chakra-ui/react'

interface IFormField extends Omit<FormControlProps, 'label'> {
  label?: string | JSX.Element
  isRequired?: boolean
  info?: string
  children: React.ReactNode
  errors?: FieldError | null
  labelStyle?: StyleProps
}

const FormField = ({
  label = '',
  children,
  errors = null,
  info,
  isRequired,
  labelStyle = {},
  ...rest
}: IFormField) => {
  return (
    <FormControl isInvalid={Boolean(errors)} w="100%" display="flex" {...rest}>
      <FormLabel fontWeight="400" fontSize="xxs" mb={0} mr={0} w="100%">
        <Text
          fontWeight="500"
          mb={1}
          fontFamily="mabry medium"
          fontSize={{ base: 'sm', sm: 'md' }}
          {...labelStyle}
        >
          {label}
          {isRequired && (
            <Box as="span" color="blue.500">
              *
            </Box>
          )}
        </Text>
        <Flex direction="column">
          {children}
          <FormErrorMessage color="red.500" fontSize={{ base: 'xs', sm: 'sm' }}>
            {errors?.message}
          </FormErrorMessage>
        </Flex>
        {info && (
          <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.500" mt={1.5}>
            {info}
          </Text>
        )}
      </FormLabel>
    </FormControl>
  )
}

export default FormField

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
import NotComplete from '~components/NotComplete'

const migrationMessage = `Nous avons maintenant besoin de cette information, veuillez remplir ce champ.`

interface Props extends Omit<FormControlProps, 'label'> {
  label?: string | JSX.Element
  isRequired?: boolean
  info?: string
  children: React.ReactNode
  errors?: FieldError | null
  labelStyle?: StyleProps
  isComplete?: boolean
  helper?: string
}

const FormField = ({
  label = '',
  children,
  errors = null,
  info,
  isRequired,
  isComplete = true,
  labelStyle = {},
  helper,
  ...rest
}: Props) => {
  return (
    <FormControl isInvalid={Boolean(errors)} w="100%" display="flex" {...rest}>
      <FormLabel fontWeight="400" fontSize="xxs" mb={0} mr={0} w="100%">
        {/* @ts-ignore */}
        <Text
          fontWeight="500"
          mb={1}
          fontFamily="mabry medium"
          fontSize={{ base: 'sm', sm: 'md' }}
          {...labelStyle}
        >
          {label}
          {helper && (
            <Text as="span" color="gray.300" pl={1}>
              {helper}
            </Text>
          )}
          {isRequired && (
            <Box as="span" color="blue.500">
              *
            </Box>
          )}
        </Text>
        <Flex direction="column">
          {children}
          {isComplete ? (
            <FormErrorMessage
              color="red.500"
              fontSize={{ base: 'xs', sm: 'sm' }}
            >
              {errors?.message}
            </FormErrorMessage>
          ) : (
            <FormErrorMessage
              color="orange.500"
              fontSize={{ base: 'xs', sm: 'sm' }}
            >
              <NotComplete message={errors?.message}>
                {migrationMessage}
              </NotComplete>
            </FormErrorMessage>
          )}
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

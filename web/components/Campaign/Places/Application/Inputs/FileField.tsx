import React, { useRef } from 'react'
import {
  Flex,
  Text,
  Button,
  Input,
  Box,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react'
import Attachment from 'public/assets/img/attachment.svg'
import { useTranslation } from 'next-i18next'
import { useController, useFormContext } from 'react-hook-form'

const FileInput = ({
  name,
  label,
  helper,
  acceptableTypes,
  maxSize,
  cta,
}: {
  name: string
  label: string
  helper?: string
  acceptableTypes: string[]
  maxSize: number
  cta?: string
}) => {
  const { t } = useTranslation('place')
  const ref = useRef(null)

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  })

  const onChange = (event) => {
    if (event.target.files) {
      const newFiles = (Array.from(
        event.target.files,
      ) as File[]).filter((file) => acceptableTypes.includes(file.type))
      if (newFiles.length > 0) {
        const maxO = maxSize * (1000 * 1000)
        const filesOverzise = newFiles.filter((el) => el.size > maxO)
        field.onChange([
          ...field.value,
          ...newFiles.filter((el) => el.size <= maxO),
        ])

        if (filesOverzise.length > 0) {
          setError(name, { message: t('global.file.tooBig') })
        } else {
          clearErrors(name)
        }
      }
    }
  }

  const deleteFile = (index, id?: number) => {
    const cloneArray = [...field.value]
    cloneArray.splice(index, 1)
    field.onChange(cloneArray)
  }

  return (
    <Box>
      <Flex justifyContent="space-between" paddingBottom={2}>
        <Text>
          <Text as="span" color="black">
            {label}
          </Text>
          {helper && (
            <Text as="span" pl={2} color="gray.200">
              {helper}
            </Text>
          )}
        </Text>
        <Box pos="relative" cursor="pointer" overflow="hidden" role="group">
          <Input
            ref={ref}
            pos="absolute"
            top="0"
            right="0"
            w="280px"
            cursor="pointer"
            type="file"
            _groupHover={{
              cursor: 'pointer',
            }}
            multiple
            accept={acceptableTypes.join(',')}
            onChange={onChange}
            opacity={0}
          />
        </Box>
      </Flex>
      {field.value.length > 0 ? (
        <Box>
          {field.value.map((file, index) => (
            <Stack
              key={file?.name}
              border="1px solid"
              borderColor={'blue.500'}
              borderRadius="4px"
              direction={{ base: 'column', md: 'row' }}
              alignItems="flex-start"
              width="100%"
              p={4}
              spacing={4}
            >
              <HStack
                w="40px"
                justifyContent="flex-start"
                alignItems="flex-start"
                display={{ base: 'none', md: 'flex' }}
                flex={1}
                spacing={4}
                fontFamily="mabry medium"
              >
                <Box>
                  <Attachment />
                </Box>

                <VStack alignItems="flex-start">
                  <Text fontWeight="bold" flex={1}>
                    {file?.name}
                  </Text>
                  <Text flex={1} color="gray.500">
                    {(file?.size / (1000 * 1000)).toFixed(1)}mo
                  </Text>
                </VStack>
              </HStack>

              <Button
                ml={{ base: 3, md: 0 }}
                colorScheme="gray"
                variant="outline"
                color="grayText.1"
                borderColor="grayText.1"
                onClick={() => deleteFile(index, file?.id)}
              >
                {t('global.file.change')}
              </Button>
            </Stack>
          ))}
        </Box>
      ) : (
        <Button
          display="flex"
          justifyContent="flex-start"
          color="black"
          variant="unstyled"
          border="2px dashed"
          borderColor={errors[name] ? 'red.500' : 'gray.200'}
          _hover={{ color: 'blue.500' }}
          onClick={() => {
            if (ref.current) {
              ref.current.click()
            }
          }}
          p={'20px!important'}
          width="100%"
          borderRadius="4px"
        >
          <HStack>
            <Attachment />
            <Text color="black">{cta || t('form.files.add')}</Text>
          </HStack>
        </Button>
      )}
      {errors[name] && (
        <Box pt={1}>
          <Text color="red.500" fontSize={{ base: 'xs', sm: 'sm' }}>
            {errors[name].message}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default FileInput

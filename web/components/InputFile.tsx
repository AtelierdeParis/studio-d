import React from 'react'
import { Flex, Text, Button, Input, Box } from '@chakra-ui/react'
import Add from 'public/assets/img/add.svg'
import Attachment from 'public/assets/img/attachment.svg'
import { useTranslation } from 'next-i18next'
import createSlug from 'url-slug'
import { Control, useController } from 'react-hook-form'

interface IInputFile {
  control: Control
  defaultValue: File[]
}

const acceptableTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/pdf',
]

const InputFile = ({ control, defaultValue = [] }: IInputFile) => {
  const { t } = useTranslation('place')

  const { field: removeField } = useController({
    name: 'removedFiles',
    control,
    defaultValue: [],
  })

  const { field } = useController({
    name: 'files',
    control,
    defaultValue,
  })

  const onChange = (event) => {
    if (event.target.files) {
      const newFiles = (Array.from(
        event.target.files,
      ) as File[]).filter((file) => acceptableTypes.includes(file.type))
      if (newFiles.length > 0) field.onChange([...field.value, ...newFiles])
    }
  }

  const deleteFile = (index, id?: number) => {
    const cloneArray = [...field.value]
    cloneArray.splice(index, 1)
    field.onChange(cloneArray)
    if (id) removeField.onChange([...removeField.value, id])
  }

  const getExtension = (filename) =>
    filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
    filename

  const updateName = (value, index) => {
    const list = [...field.value]

    Object.assign(list[index], {
      display_name: `${createSlug(value)}.${getExtension(
        field.value[index].name,
      )}`,
    })
    field.onChange(list)
  }

  return (
    <Box>
      <Flex textStyle="infoLabel" justifyContent="space-between" mb={4}>
        <Text>{t('form.filesLabel')}</Text>
        <Box pos="relative" cursor="pointer" overflow="hidden">
          <Button variant="unstyled" display="flex" alignItems="center">
            <Box as="span" pr={2} color="black">
              {t('form.files.add')}
            </Box>
            <Add />
          </Button>
          <Input
            pos="absolute"
            top="0"
            right="0"
            w="280px"
            cursor="pointer"
            type="file"
            multiple
            accept={acceptableTypes.join(',')}
            onChange={onChange}
            opacity={0}
          />
        </Box>
      </Flex>
      {field.value.length > 0 ? (
        <Box>
          <Flex
            backgroundColor="blue.200"
            color="grayText.1"
            py={2.5}
            pl={10}
            alignItems="center"
            lineHeight="1.8"
          >
            <Text
              borderLeft="1px solid"
              borderColor="gray.200"
              pl={2.5}
              w="35%"
            >
              {t('form.files.name')}
            </Text>
            <Text borderLeft="1px solid" borderColor="gray.200" pl={2.5}>
              {t('form.files.displayName')}
            </Text>
          </Flex>
          {field.value.map((file, index) => (
            <Flex
              key={file?.name}
              py={2.5}
              pl={3}
              alignItems="center"
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Attachment />
              <Text ml={5} w="32%">
                {file?.name}
              </Text>
              <Flex
                justifyContent="space-between"
                flex={1}
                alignItems="center"
                pl={4}
              >
                <Box>
                  <Input
                    name={`files.name[${index}]`}
                    onChange={(e) => updateName(e.currentTarget.value, index)}
                    size="sm"
                    w="20rem"
                  />
                </Box>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  color="grayText.1"
                  borderColor="grayText.1"
                  onClick={() => deleteFile(index, file?.id)}
                >
                  {t('form.files.delete')}
                </Button>
              </Flex>
            </Flex>
          ))}
        </Box>
      ) : (
        <Text
          borderBottom="1px solid"
          borderColor="gray.50"
          pb={4}
          pl={2.5}
          color="gray.400"
        >
          {t('form.files.noFile')}
        </Text>
      )}
    </Box>
  )
}

export default InputFile

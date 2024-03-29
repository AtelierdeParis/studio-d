import React, { ReactNode, useRef } from 'react'
import {
  Flex,
  Text,
  Button,
  Input,
  Box,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react'
import Add from 'public/assets/img/add-circle.svg'
import Attachment from 'public/assets/img/attachment.svg'
import { useTranslation } from 'next-i18next'
import { Espace } from 'typings/api'
import { Control, useController } from 'react-hook-form'

interface IInputFile {
  control: Control
  place: Espace
  name?: string
  label?: ReactNode
}

const acceptableTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/pdf',
]

const InputFile = ({ control, place, name = 'Files', label }: IInputFile) => {
  const { t } = useTranslation('place')
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const ref = useRef(null)

  const { field: removeField } = useController({
    name: 'removed' + name,
    control,
    defaultValue: [],
  })

  const { field } = useController({
    name: name?.toLowerCase(),
    control,
    defaultValue: place?.[name.toLowerCase()] || [],
  })

  const onChange = (event) => {
    if (event.target.files) {
      const newFiles = (Array.from(
        event.target.files,
      ) as File[]).filter((file) => acceptableTypes.includes(file.type))
      if (newFiles.length > 0) {
        field.onChange([...field.value, ...newFiles])
      }
    }
  }

  const deleteFile = (index, id?: number) => {
    const cloneArray = [...field.value]
    cloneArray.splice(index, 1)
    field.onChange(cloneArray)
    if (id) removeField.onChange([...removeField.value, id])
  }

  const updateName = (value, index) => {
    const list = [...field.value]

    Object.assign(list[index], {
      caption: value,
    })
    field.onChange(list)
  }

  return (
    <Box>
      <Flex
        textStyle="infoLabel"
        justifyContent="space-between"
        mb={{ base: 0, md: 4 }}
        pr={2.5}
      >
        <Text>{label || t('form.filesLabel')}</Text>
        <Box pos="relative" cursor="pointer" overflow="hidden" role="group">
          <Button
            pos="relative"
            zIndex="99"
            variant="unstyled"
            display="flex"
            alignItems="center"
            color="black"
            _hover={{ color: 'blue.500' }}
            onClick={() => {
              if (ref.current) {
                ref.current.click()
              }
            }}
          >
            <Box pr={2}>{t('form.files.add')}</Box>
            <Add />
          </Button>
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
          <Flex
            display={{ base: 'none', md: 'flex' }}
            backgroundColor="blue.200"
            color="grayText.1"
            py={2.5}
            alignItems="center"
            lineHeight="1.8"
          >
            <Spacer
              w="40px"
              flex="none"
              display={{ base: 'none', md: 'flex' }}
            />
            <Text
              borderLeft="1px solid"
              borderColor={{ base: 'transparent', md: 'gray.200' }}
              pl={2.5}
              w="35%"
            >
              {t('form.files.name')}
            </Text>
            <Text
              borderLeft="1px solid"
              borderColor="gray.200"
              pl={2.5}
              flex={1}
            >
              {t('form.files.displayName')}
            </Text>
          </Flex>
          {field.value.map((file, index) => (
            <Flex
              key={file?.name}
              py={2.5}
              alignItems={{ base: 'flex-start', md: 'center' }}
              borderBottom="1px solid"
              borderColor="gray.100"
              direction={{ base: 'column', md: 'row' }}
            >
              <Flex
                w="40px"
                justifyContent="center"
                display={{ base: 'none', md: 'flex' }}
              >
                <Attachment />
              </Flex>
              <Text pl={2.5} w={{ base: '100%', md: '35%' }}>
                {file?.name}
              </Text>
              <Flex
                justifyContent="space-between"
                flex={1}
                alignItems="center"
                pl={2.5}
                pr={0.5}
                w={{ base: '100%', md: 'auto' }}
              >
                <Box flex={1} pt={{ base: 2, md: 0 }}>
                  <Input
                    name={`files.name[${index}]`}
                    value={file.caption || ''}
                    onChange={(e) => updateName(e.currentTarget.value, index)}
                    size="sm"
                    placeholder={isMobile && t('form.files.displayName')}
                    w={{ base: '100%', lg: '20rem' }}
                  />
                </Box>

                <Button
                  ml={{ base: 3, md: 0 }}
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
          mt={{ base: 4, md: 0 }}
          color="gray.400"
        >
          {t('form.files.noFile')}
        </Text>
      )}
    </Box>
  )
}

export default InputFile

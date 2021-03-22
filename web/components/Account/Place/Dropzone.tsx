import React from 'react'
import ReactDropzone from 'react-dropzone'
import { Flex, Text, BoxProps, Button, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import useToast from '~hooks/useToast'

interface IDropzone extends Omit<BoxProps, 'onDrop'> {
  maxFiles?: number
  nbFiles: number
  onDrop: (files: File[]) => void
}

const Dropzone = ({ maxFiles = 10, onDrop, nbFiles, ...rest }: IDropzone) => {
  const { t } = useTranslation('place')
  const { errorToast } = useToast()
  if (nbFiles >= maxFiles) return null
  return (
    <ReactDropzone
      accept={['image/jpeg', 'image/jpg', 'image/png']}
      maxFiles={maxFiles - nbFiles}
      onDropAccepted={onDrop}
      onDropRejected={(files) =>
        files
          .reduce((total, current) => {
            current.errors.map((err) => {
              if (!total.includes(err.code)) total.push(err.code)
            })
            return total
          }, [])
          .map((err) =>
            errorToast(t(`dropzone.rejected.${err}`, { nb: maxFiles })),
          )
      }
    >
      {({ getRootProps, getInputProps }) => (
        <Box {...getRootProps()} position="relative">
          <input {...getInputProps()} />
          {nbFiles === 0 && (
            <Flex
              border="1px solid"
              borderColor="blue.200"
              color="grayText.1"
              borderRadius="md"
              backgroundColor="blue.100"
              w="100%"
              h="100%"
              p={4}
              direction="column"
              justifyContent="center"
              minH="15rem"
              {...rest}
            >
              <Flex w="100%" justifyContent="center" alignItems="center" py={4}>
                <Flex
                  textAlign="center"
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  h="100%"
                  maxW="md"
                >
                  <Text fontSize="xl" my={4}>
                    {t('dropzone.placeholder')}
                  </Text>
                  <Text fontSize="md">{t('dropzone.subtitle')}</Text>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Button size="lg" pos="absolute" top="calc(100% + 20px)" right="0">
            {t('addImg')}
          </Button>
        </Box>
      )}
    </ReactDropzone>
  )
}

export default Dropzone

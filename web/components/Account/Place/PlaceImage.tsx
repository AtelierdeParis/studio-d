import React, { useState } from 'react'
import { SimpleGrid, CloseButton, Image, Flex } from '@chakra-ui/react'
import Dropzone from '~components/Account/Place/Dropzone'

const PlaceImage = () => {
  const [files, setFiles] = useState([])
  const onDrop = (acceptedFiles) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    ])
  }

  const onRemove = (index: number) => {
    const cloneArray = [...files]
    cloneArray.splice(index, 1)
    setFiles(cloneArray)
  }

  return (
    <>
      {files.length > 0 && (
        <SimpleGrid columns={4} mb={2} columnGap={6} rowGap={6}>
          {files.map((file, index) => (
            <Flex
              key={file.name}
              backgroundColor="blue.100"
              justifyContent="center"
              alignItems="center"
              minH="130px"
              pos="relative"
              role="group"
            >
              <CloseButton
                onClick={() => onRemove(index)}
                pos="absolute"
                top={1}
                right={1}
                zIndex="99"
                borderRadius="full"
                backgroundColor="gray.100"
                opacity="0"
                _hover={{
                  backgroundColor: 'gray.100',
                  color: 'gray.600',
                }}
                _groupHover={{
                  opacity: 1,
                }}
              />
              <Image src={file.preview} />
            </Flex>
          ))}
        </SimpleGrid>
      )}
      <Dropzone onDrop={onDrop} nbFiles={files.length} />
    </>
  )
}

export default PlaceImage

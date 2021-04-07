import React, { useState, useMemo } from 'react'
import { SimpleGrid, CloseButton, Flex, Button, Image } from '@chakra-ui/react'
import Dropzone from '~components/Account/Place/Dropzone'
import { client } from '~api/client-api'
import { addFiles } from '~utils/file'
import { Espace } from '~typings/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
interface IPlaceImage {
  place: Espace
}

const PlaceImage = ({ place }: IPlaceImage) => {
  const { t } = useTranslation('place')
  const [files, setFiles] = useState<any>(place?.images || [])
  const newFiles = useMemo(() => files.filter((file) => !file.id), [files])
  const { errorToast, successToast } = useToast()
  const [isLoading, setLoading] = useState(false)
  const [removed, setRemoved] = useState([])

  const onDrop = (acceptedFiles) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    ])
  }

  const onRemove = (index: number, id?: number) => {
    const cloneArray = [...files]
    cloneArray.splice(index, 1)
    setFiles(cloneArray)
    if (id) setRemoved([...removed, id])
  }

  const onSubmit = async () => {
    setLoading(true)

    if (removed.length > 0) {
      await Promise.all(
        removed.map((id) => client.upload.filesDelete(id)),
      ).then(() => {
        if (newFiles.length === 0) successToast(t('successImg'))
      })
      setRemoved([])
    }

    if (newFiles.length > 0) {
      addFiles(newFiles, {
        ref: 'espace',
        refId: place.id.toString(),
        field: 'images',
      })
        .then((res) => {
          setFiles(
            files.map((file) => {
              if (file.id) return file
              const createdFiled = res.data.find(
                (createdFile) => createdFile.name === file.name,
              )
              if (createdFiled) return createdFiled
              return file
            }),
          )
          successToast(t('successImg'))
        })
        .catch(() => errorToast(t('common:error')))
    }
    setLoading(false)
  }

  return (
    <>
      {files.length > 0 && (
        <SimpleGrid columns={4} mb={2} columnGap={6} rowGap={6}>
          {files.map((file, index) => (
            <Flex
              key={file?.id || file.name}
              backgroundColor="blue.100"
              justifyContent="center"
              alignItems="center"
              minH="130px"
              pos="relative"
              role="group"
            >
              <CloseButton
                onClick={() => onRemove(index, file?.id || null)}
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
              <Image
                src={
                  file?.preview
                    ? file.preview
                    : process.env.NEXT_PUBLIC_BACK_URL + file.url
                }
              />
            </Flex>
          ))}
        </SimpleGrid>
      )}
      <Dropzone onDrop={onDrop} nbFiles={files.length} />
      <Flex justifyContent="center" mt={18}>
        <Button
          colorScheme="blue"
          size="lg"
          mt={6}
          onClick={onSubmit}
          isLoading={isLoading}
          isDisabled={newFiles.length === 0 && removed.length === 0}
        >
          {t(`save`)}
        </Button>
      </Flex>
    </>
  )
}

export default PlaceImage

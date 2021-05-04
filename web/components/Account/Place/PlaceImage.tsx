import React, { useState, useMemo } from 'react'
import {
  SimpleGrid,
  CloseButton,
  Flex,
  Button,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import Dropzone from '~components/Account/Place/Dropzone'
import { client } from '~api/client-api'
import { addFiles } from '~utils/file'
import { Espace, UploadFile } from '~typings/api'
import useToast from '~hooks/useToast'
import { useTranslation } from 'next-i18next'
import PlaceFormBar from '~components/Account/Place/PlaceFormBar'
import Check from 'public/assets/img/check.svg'
import FallbackImage from '~components/FallbackImage'
import { Router } from 'next/router'
import { ROUTE_ACCOUNT_PLACE_DETAIL } from '~constants'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
interface Props {
  place: Espace
}

const PlaceImage = ({ place }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
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

  const onRemove = (index: number, file: UploadFile) => {
    const cloneArray = [...files]
    cloneArray.splice(index, 1)
    setFiles(cloneArray)
    if (file) setRemoved([...removed, file])
  }

  const onReset = () => {
    setFiles(files.filter((file) => file.id).concat(removed))
    setRemoved([])
  }

  const onSubmit = async () => {
    setLoading(true)

    if (removed.length > 0) {
      await Promise.all(
        removed.map(({ id }) => client.upload.filesDelete(id)),
      ).then((res) => {
        if (newFiles.length === 0) successToast(t('successImg'))
        const removedImages = res.map(({ data }) => data.id)
        queryClient.setQueryData(['place', place.slug], {
          ...place,
          images: [
            ...place.images.filter(({ id }) => !removedImages.includes(id)),
          ],
        })
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
          queryClient.setQueryData(['place', place.slug], {
            ...place,
            images: [...place.images, ...res.data],
          })
          const redirect = files.length === newFiles.length
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

          if (redirect) {
            router.push({
              pathname: ROUTE_ACCOUNT_PLACE_DETAIL,
              query: { id: place.slug, index: 2 },
            })
          }
          successToast(t('successImg'))
        })
        .catch(() => errorToast(t('common:error')))
    }
    setLoading(false)
  }

  return (
    <>
      {files.length > 0 && (
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          mb={2}
          columnGap={6}
          rowGap={6}
        >
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
                onClick={() => onRemove(index, file || null)}
                pos="absolute"
                top={1}
                right={1}
                zIndex="99"
                borderRadius="full"
                backgroundColor="gray.100"
                opacity={{ base: 1, md: 0 }}
                _hover={{
                  backgroundColor: 'gray.100',
                  color: 'gray.600',
                }}
                _groupHover={{
                  opacity: 1,
                }}
              />
              <AspectRatio ratio={16 / 9} h="100%" w="100%">
                <Image
                  src={file?.preview ? file.preview : file.url}
                  objectFit="cover"
                  fallback={<FallbackImage />}
                />
              </AspectRatio>
            </Flex>
          ))}
        </SimpleGrid>
      )}
      <Dropzone onDrop={onDrop} nbFiles={files.length} />
      {(place.disponibilities.length === 0 ||
        newFiles.length > 0 ||
        removed.length > 0) && (
        <PlaceFormBar isNotAvailable={place.disponibilities.length === 0}>
          <Flex alignItems="center">
            <Button
              variant="unstyled"
              color="gray.400"
              _hover={{ color: 'gray.500' }}
              onClick={onReset}
            >
              {t('cancel')}
            </Button>
            <Button
              ml={3}
              size="lg"
              leftIcon={<Check />}
              onClick={onSubmit}
              isLoading={isLoading}
              isDisabled={newFiles.length === 0 && removed.length === 0}
              type="submit"
            >
              {t('save')}
            </Button>
          </Flex>
        </PlaceFormBar>
      )}
    </>
  )
}

export default PlaceImage

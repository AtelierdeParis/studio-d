import { Espace } from '~typings/api'
import React from 'react'
import { saveAs } from 'file-saver'
import { Flex, Button, Text, Stack, Box, VStack } from '@chakra-ui/react'
import MarkdownRenderer from '~components/MarkdownRenderer'
import Download from 'public/assets/img/download.svg'
import axios from 'axios'
import { useTranslation } from 'next-i18next'

const PlaceDetailExtraInfo = ({ place }: { place: Espace }) => {
  const { t } = useTranslation('place')

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      pt={{ base: 14, lg: 18 }}
      spacing={10}
    >
      {(place?.about || place?.files?.length > 0) && (
        <Box px={{ base: 0, lg: 10 }} flex={1}>
          <Text textStyle="h2" mb={8}>
            {t('detail.about')}
          </Text>
          <VStack spacing={7} alignItems="flex-start">
            {place?.about && (
              <Box overflow="hidden" wordBreak="break-word">
                <MarkdownRenderer>{place?.about}</MarkdownRenderer>
              </Box>
            )}
            {place?.files?.length > 0 && (
              <Flex flexWrap="wrap">
                {place?.files.map((file) => (
                  <Button
                    key={file.id}
                    mb={4}
                    mr={4}
                    leftIcon={<Download />}
                    colorScheme="gray"
                    fontSize="md"
                    onClick={() => {
                      axios({
                        url: file.url,
                        method: 'GET',
                        responseType: 'blob',
                      }).then(() => {
                        saveAs(file.url, file.name)
                      })
                    }}
                  >
                    {file.caption ? `${file.caption} (${file.ext})` : file.name}
                  </Button>
                ))}
              </Flex>
            )}
          </VStack>
        </Box>
      )}
      {place?.details && (
        <Box px={{ base: 0, lg: 10 }} flex={1}>
          <Text textStyle="h2" mb={8}>
            {t('detail.details')}
          </Text>
          <Box overflow="hidden" wordBreak="break-word">
            <MarkdownRenderer>{place?.details}</MarkdownRenderer>
          </Box>
        </Box>
      )}
    </Stack>
  )
}

export default PlaceDetailExtraInfo

import { Button, Divider, VStack } from '@chakra-ui/react'
import { Espace } from '~typings/api'
import axios from 'axios'
import Download from 'public/assets/img/download.svg'
import { saveAs } from 'file-saver'

const CampaignPlaceFiles = ({ place }: { place: Espace }) => {
  if (place?.campaign_files?.length > 0)
    return (
      <VStack width="100%" spacing={6} paddingY={4}>
        <Divider />
        <VStack alignItems="flex-start">
          {place?.campaign_files.map((file) => (
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
        </VStack>
      </VStack>
    )
  return null
}

export default CampaignPlaceFiles

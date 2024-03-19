import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import SearchIcon from '~public/assets/icons/SearchIcon'

const ApplicationsSearch = () => {
  const { t } = useTranslation('application')
  const router = useRouter()

  const handleSearch = (value) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: value },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Box p={{ base: 2, sm: 4 }} width={{ base: '100%', sm: 'auto' }}>
      <InputGroup width={{ base: '100%', sm: 'auto' }}>
        <Input
          placeholder={t('place.search')}
          onChange={(e) => handleSearch(e.target.value)}
          height="30px"
          width={{ base: '100%', sm: 'auto' }}
        />
        <InputRightElement height="30px">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default ApplicationsSearch

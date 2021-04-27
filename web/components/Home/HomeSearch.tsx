import React from 'react'
import {
  Flex,
  Button,
  Box,
  Divider,
  useTheme,
  useBreakpointValue,
} from '@chakra-ui/react'
import Calendar from 'public/assets/img/calendar.svg'
import Pin from 'public/assets/img/pin-outline.svg'
import FormField from '~components/FormField'
import InputCity from '~components/InputCity'
import InputDateRange from '~components/InputDateRange'
import { ROUTE_PLACES } from '~constants'
import { formatSearchToQuery } from '~utils/search'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const HomeSearch = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { control, handleSubmit } = useForm()
  const { t } = useTranslation('home')
  const theme = useTheme()
  const router = useRouter()

  const onSubmit = (data) => {
    router.push({
      pathname: ROUTE_PLACES,
      query: formatSearchToQuery(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Flex
        bgColor="white"
        px={6}
        pt={4}
        pb={{ base: 2, md: 4 }}
        borderRadius={{ base: 'none', md: 'lg' }}
        pos="relative"
        alignItems="flex-start"
        zIndex={99}
        maxW="750px"
        mx="auto"
        transform={{ base: 'none', md: 'translateY(50%)' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          alignItems="flex-start"
          flex={1}
          w="100%"
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex w="100%" pt={1}>
            <Pin stroke={theme.colors.blue['500']} width="22px" height="22px" />
            <Box pl={3.5} flex={1}>
              <FormField label={t('search.where.label')}>
                <InputCity
                  name="city"
                  control={control}
                  placeholder={t('search.where.placeholder')}
                />
              </FormField>
            </Box>
          </Flex>
          {isMobile ? (
            <Divider my={3.5} opacity="0.3" />
          ) : (
            <Divider
              orientation="vertical"
              mx={3.5}
              h="45px"
              opacity="0.3"
              alignSelf="center"
            />
          )}
        </Flex>
        <Flex alignItems="flex-start" pos="relative" flex={1} w="100%">
          <Flex w="100%">
            <Calendar stroke={theme.colors.blue['500']} />
            <Box pl={3.5} flex={1}>
              <InputDateRange
                label={t('search.when.label')}
                control={control}
                placeholder={t('search.when.placeholder')}
              />
            </Box>
          </Flex>
        </Flex>
        <Button
          size="lg"
          type="submit"
          alignSelf="center"
          my={{ base: 6, md: 0 }}
        >
          {t('search.btn')}
        </Button>
      </Flex>
    </form>
  )
}

export default HomeSearch

import React from 'react'
import { Flex, Button, Box, Divider, useTheme } from '@chakra-ui/react'
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        bgColor="white"
        px={6}
        py={4}
        borderRadius="lg"
        pos="relative"
        alignItems="center"
        zIndex={99}
        maxW="750px"
        mx="auto"
        transform="translateY(-50%)"
      >
        <Flex alignItems="flex-start" flex={1}>
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
          <Divider
            orientation="vertical"
            mx={3.5}
            h="45px"
            opacity="0.3"
            alignSelf="center"
          />
        </Flex>
        <Flex alignItems="flex-start" pt={1} pos="relative" flex={1}>
          <Flex w="100%" pt={1}>
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
        <Button size="lg" type="submit">
          {t('search.btn')}
        </Button>
      </Flex>
    </form>
  )
}

export default HomeSearch

import React from 'react'
import {
  Flex,
  Button,
  Box,
  Divider,
  useTheme,
  useBreakpointValue,
  VStack,
  Stack,
  HStack,
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
import Tag from '~components/Tag'

const HomeSearch = ({ hasActiveCampaign }: { hasActiveCampaign?: boolean }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { control, handleSubmit } = useForm()
  const { t } = useTranslation('home')
  const { t: tCommon } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()

  const onSubmit = (data) => {
    router.push({
      pathname: ROUTE_PLACES,
      query: formatSearchToQuery(data),
    })
  }

  return (
    <VStack
      bgColor="white"
      borderRadius={
        hasActiveCampaign
          ? { base: 'none', lg: 'lg' }
          : { base: 'none', md: 'lg' }
      }
      p={4}
      alignItems="flex-start"
      height={'100%'}
    >
      {hasActiveCampaign && (
        <Box>
          <Tag status="solidarity">{tCommon('solidarity.tag')}</Tag>
        </Box>
      )}
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            mx="auto"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="flex-start"
          >
            <HStack w="100%" p={2} alignItems="flex-start">
              <Pin
                stroke={theme.colors.blue['500']}
                width="22px"
                height="22px"
              />
              <Box flex={1}>
                <FormField
                  label={t('search.where.label')}
                  labelStyle={{ mb: 0 }}
                >
                  <InputCity
                    name="city"
                    control={control}
                    placeholder={t('search.where.placeholder')}
                  />
                </FormField>
              </Box>
            </HStack>

            <Box width={{ base: '100%', md: 'auto' }}>
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
            </Box>

            <HStack w="100%" alignItems="flex-start">
              <Calendar stroke={theme.colors.blue['500']} />
              <Box flex={1}>
                <InputDateRange
                  label={t('search.when.label')}
                  control={control}
                  placeholder={t('search.when.placeholder')}
                />
              </Box>
            </HStack>

            <Box>
              <Button
                size="lg"
                type="submit"
                alignSelf="center"
                my={{ base: 6, md: 0 }}
                variant={hasActiveCampaign ? 'blueFill' : 'solid'}
              >
                {t('search.btn')}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </VStack>
  )
}

export default HomeSearch

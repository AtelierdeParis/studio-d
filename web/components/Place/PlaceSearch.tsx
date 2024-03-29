import React, { useState } from 'react'
import {
  Flex,
  SimpleGrid,
  Divider,
  Box,
  ButtonGroup,
  Button,
  useTheme,
  useBreakpointValue,
} from '@chakra-ui/react'
import FormField from '~components/FormField'
import InputCity from '~components/InputCity'
import PlaceSlider from '~components/Place/PlaceSlider'
import InputDateRange from '~components/InputDateRange'
import Select from '~components/Select'
import Calendar from 'public/assets/img/calendar.svg'
import Pin from 'public/assets/img/pin-outline.svg'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'
import { SurfaceOptions, HeightOptions } from '~utils/search'
import useCampaignContext from '~components/Campaign/useCampaignContext'

const selectProps = {
  variant: 'unstyled',
  h: '22px',
  pl: 3,
}

const PlaceSearch = ({
  onSubmit,
  isCampaignTab,
}: {
  onSubmit: any
  isCampaignTab?: boolean
}) => {
  const theme = useTheme()
  const [isLoading, setLoading] = useState(false)
  const [hasMoreFilters, setMoreFilter] = useState(false)
  const { t } = useTranslation('place')
  const form = useFormContext()
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const city = form.watch('city')
  const { currentCampaign } = useCampaignContext()

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={isCampaignTab ? { width: '100%' } : {}}
    >
      <Flex
        bgColor={isCampaignTab ? 'campaign.light' : 'blue.100'}
        px={{ base: 3, md: 5 }}
        py={{ base: 4, md: 6 }}
        borderRadius={isCampaignTab ? '4px!important' : 'md'}
        borderTopLeftRadius={currentCampaign ? 0 : 'md'}
        position="relative"
        zIndex={100}
        mb={{ base: 0, sm: 10 }}
        direction="column"
        mt={currentCampaign ? 0 : 6}
        height={isCampaignTab ? '100%' : 'auto'}
      >
        <SimpleGrid
          columns={
            isCampaignTab ? { base: 1, md: 3 } : { base: 1, md: 2, lg: 4 }
          }
          rowGap={0}
          w="100%"
        >
          <Flex
            alignItems="flex-start"
            direction={{ base: 'column', md: 'row' }}
          >
            <Flex w="100%" direction="column">
              <Flex w="100%">
                <Pin
                  stroke={theme.colors.blue['500']}
                  width="22px"
                  height="22px"
                />
                <Box pl={3.5} flex={1} pt={1}>
                  <FormField
                    label={t('search.where.label')}
                    labelStyle={{ mb: 0 }}
                  >
                    <InputCity
                      name="city"
                      control={form.control}
                      placeholder={t('search.where.placeholder')}
                    />
                  </FormField>
                </Box>
              </Flex>
              {city && city !== '' && (
                <Flex w="100%">
                  <Box ml="22px" pl={3.5} flex={1} pt={1}>
                    <Divider
                      orientation="horizontal"
                      opacity={{ base: 0, md: 0.5 }}
                      my={2.5}
                    />
                    <FormField
                      label={t('search.perimeter.label')}
                      labelStyle={{ mb: 0 }}
                    >
                      <PlaceSlider control={form.control} />
                    </FormField>
                  </Box>
                </Flex>
              )}
            </Flex>

            <Divider
              orientation="vertical"
              mx={3.5}
              opacity={0.5}
              display={
                !isCampaignTab ? { base: 'none', sm: 'none', md: 'block' } : {}
              }
            />

            <Divider
              orientation="horizontal"
              my={4}
              opacity={0.5}
              display={!isCampaignTab ? { base: 'block', md: 'none' } : 'none'}
            />
          </Flex>
          {!isCampaignTab && (
            <Flex alignItems="flex-start" pos="relative">
              <Flex w="100%">
                <Box pt={0.5}>
                  <Calendar stroke={theme.colors.blue['500']} />
                </Box>
                <Box pl={3.5} flex={1}>
                  <InputDateRange
                    label={t('search.when.label')}
                    control={form.control}
                    placeholder={t('search.when.placeholder')}
                  />
                </Box>
              </Flex>
              <Divider
                orientation="vertical"
                mx={3.5}
                opacity={0.5}
                display={{ base: 'none', lg: 'block' }}
              />
            </Flex>
          )}
          <Flex
            alignItems="flex-start"
            display={
              isMobile && !hasMoreFilters && !isCampaignTab ? 'none' : 'flex'
            }
          >
            <Box flex={1} pt={{ base: 6, md: 0 }}>
              <FormField labelStyle={{ mb: 0 }}>
                <Select
                  name="surface"
                  control={form.control}
                  placeholder={t('search.surface')}
                  {...selectProps}
                >
                  <option value={SurfaceOptions.LESS_50}>{'< 50 m²'}</option>
                  <option value={SurfaceOptions.BETWEEN_50_120}>
                    {t('search.surfaceBetween', { min: 50, max: 120 })}
                  </option>
                  <option value={SurfaceOptions.GREATER_120}>
                    {'> 120 m²'}
                  </option>
                </Select>
              </FormField>
              <Divider my={1.5} opacity={0.5} />
              <FormField>
                <Select
                  name="floor"
                  control={form.control}
                  placeholder={t('search.floorType')}
                  {...selectProps}
                >
                  <option value="parquetTraditionnel">
                    {t('form.floor.traditional')}
                  </option>
                  <option value="plancherDanse">{t('form.floor.dance')}</option>
                </Select>
              </FormField>
              {hasMoreFilters && (
                <>
                  <Divider my={1.5} opacity={0.5} />
                  <FormField>
                    <Select
                      name="mirror"
                      control={form.control}
                      placeholder={t('search.mirror.placeholder')}
                      {...selectProps}
                    >
                      <option value="true">{t('search.mirror.yes')}</option>
                    </Select>
                  </FormField>
                  <Divider my={1.5} opacity={0.5} />
                  <FormField>
                    <Select
                      name="technicalStaff"
                      control={form.control}
                      placeholder={t('search.technicalStaff.placeholder')}
                      {...selectProps}
                    >
                      <option value="true">
                        {t('search.technicalStaff.yes')}
                      </option>
                    </Select>
                  </FormField>
                </>
              )}
            </Box>
            <Divider
              orientation="vertical"
              mx={3.5}
              opacity={0.5}
              display={{ base: 'none', md: 'block' }}
            />
          </Flex>
          <Flex
            alignItems="flex-start"
            display={
              isMobile && !hasMoreFilters && !isCampaignTab ? 'none' : 'flex'
            }
          >
            <Box flex={1}>
              <Divider
                my={1.5}
                opacity={0.5}
                display={{ base: 'block', md: 'none' }}
              />
              <FormField labelStyle={{ mb: 0 }}>
                <Select
                  name="height"
                  control={form.control}
                  placeholder={t('search.height')}
                  {...selectProps}
                >
                  <option value={HeightOptions.LESS_3}>{'< 3 mètres'}</option>
                  <option value={HeightOptions.BETWEEN_3_5}>
                    {t('search.heightBetween', { min: 3, max: 5 })}
                  </option>
                  <option value={HeightOptions.GREATER_5}>
                    {'> 5 mètres'}
                  </option>
                </Select>
              </FormField>
              <Divider my={1.5} opacity={0.5} />
              <FormField>
                <Select
                  name="accomodation"
                  control={form.control}
                  placeholder={t('search.accomodation.placeholder')}
                  {...selectProps}
                >
                  <option value="true">{t('search.accomodation.yes')}</option>
                </Select>
              </FormField>
              {hasMoreFilters && (
                <>
                  <Divider my={1.5} opacity={0.5} />
                  <FormField>
                    <Select
                      name="danceBar"
                      control={form.control}
                      placeholder={t('search.danceBar.placeholder')}
                      {...selectProps}
                    >
                      <option value="true">{t('search.danceBar.yes')}</option>
                    </Select>
                  </FormField>
                </>
              )}
            </Box>
          </Flex>
        </SimpleGrid>
        <Flex justifyContent="flex-end" pt={6}>
          <ButtonGroup spacing={6}>
            <Button
              variant="line"
              alignSelf="center"
              onClick={() => setMoreFilter(!hasMoreFilters)}
            >
              {hasMoreFilters ? t('search.less') : t('search.more')}
            </Button>
            <Button
              type="submit"
              size="lg"
              variant={isCampaignTab ? 'campaign' : 'blueFill'}
              // isDisabled={isDisabled}
              isLoading={isLoading}
            >
              {t('search.submit')}
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </form>
  )
}

export default PlaceSearch

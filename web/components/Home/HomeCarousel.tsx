import React from 'react'
import { Flex, Heading, Box, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useHomeCarousel } from '~hooks/useHomeCarousel'
import Image from '~components/Image'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import HomeActions from '~components/Home/HomeActions'
import useCampaignContext from '~components/Campaign/useCampaignContext'

SwiperCore.use([Autoplay])

const HomeCarousel = () => {
  const { t } = useTranslation('home')
  const { data: carousel } = useHomeCarousel()
  const { hasActiveCampaign } = useCampaignContext()

  return (
    <VStack>
      <Flex
        direction="column"
        backgroundPosition="center"
        backgroundSize="cover"
        justifyContent="flex-end"
        alignItems="center"
        height="calc(100vh - 150px)"
        maxH={{ base: '320px', lg: '600px' }}
        pos="relative"
        width="100%"
      >
        {Boolean(carousel) && (
          <Flex layerStyle="absoluteFull" zIndex={3}>
            <Swiper
              slidesPerView="auto"
              observer
              parallax
              autoplay={{
                delay: 4000,
              }}
            >
              {carousel?.images?.map((img) => (
                <SwiperSlide key={img.id}>
                  <Image src={img.url} objectFit="cover" h="100%" w="100%" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Flex>
        )}
        <Box
          maxW={hasActiveCampaign ? '1200px' : '550px'}
          w="100%"
          alignSelf={{ base: 'flex-start', md: 'center' }}
        >
          <Heading
            as="h1"
            fontWeight="500"
            color="white"
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
            whiteSpace="pre-line"
            pos="relative"
            zIndex={10}
            pl={5}
            pr={{ base: 5, sm: 0 }}
            pb={{ base: 5, lg: 0 }}
            textShadow="0px 0px 17px #2d2d2d"
            lineHeight={1.1}
          >
            {t('title')}
          </Heading>
        </Box>
        <Box
          position="relative"
          top="40px"
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
        >
          <HomeActions />
        </Box>

        <Box
          background="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)"
          pos="absolute"
          left="0"
          right="0"
          bottom="0"
          h="55%"
          zIndex={9}
        />
        <Box
          background="linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%);"
          pos="absolute"
          left="0"
          right="0"
          top="0"
          h="20%"
          opacity="0.7"
          zIndex={9}
        />
      </Flex>
      <Box display={{ base: 'block', lg: 'none' }} width="100%">
        <HomeActions />
      </Box>
    </VStack>
  )
}

export default HomeCarousel

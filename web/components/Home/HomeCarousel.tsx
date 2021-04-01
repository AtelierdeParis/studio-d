import React from 'react'
import { Flex, Heading, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useHomeCarousel } from '~hooks/useHomeCarousel'
import Image from '~components/Image'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Autoplay])

const HomeCarousel = () => {
  const { t } = useTranslation('home')
  const { data: carousel } = useHomeCarousel()

  return (
    <Flex
      direction="column"
      backgroundPosition="center"
      backgroundSize="cover"
      justifyContent="flex-end"
      alignItems="center"
      h="45vh"
      pos="relative"
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
                <Image src={img.url} objectFit="cover" h="45vh" w="100%" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      )}
      <Heading
        as="h1"
        textStyle="h1"
        color="white"
        mb={7}
        whiteSpace="pre"
        pos="relative"
        zIndex={10}
        textShadow="0px 0px 17px #2d2d2d"
      >
        {t('title')}
      </Heading>
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
  )
}

export default HomeCarousel

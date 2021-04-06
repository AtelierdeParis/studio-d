import React, { useState } from 'react'
import Image from '~components/Image'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Text } from '@chakra-ui/react'

SwiperCore.use([Navigation])

const PlaceCardCarousel = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  return (
    <>
      <Swiper
        slidesPerView="auto"
        observer
        parallax
        navigation
        onSlideChangeTransitionEnd={({ activeIndex }) =>
          setCurrentSlide(activeIndex + 1)
        }
      >
        {images?.map((img) => (
          <SwiperSlide key={img.id}>
            <Image src={img.url} objectFit="cover" h="100%" w="100%" />
          </SwiperSlide>
        ))}
        <Text
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          pos="absolute"
          right={4}
          bottom={4}
          color="white"
          zIndex={6}
          fontFamily="mabry medium"
          fontWeight="500"
          textShadow="0px 1px 4px #000"
        >{`${currentSlide}/${images.length}`}</Text>
      </Swiper>
    </>
  )
}

export default PlaceCardCarousel

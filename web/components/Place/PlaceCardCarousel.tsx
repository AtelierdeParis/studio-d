import React, { useState } from 'react'
import Image from '~components/Image'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Text } from '@chakra-ui/react'

SwiperCore.use([Navigation])

const PlaceCardCarousel = ({ images = [], showNumber = false }) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  return (
    <>
      <Swiper
        slidesPerView="auto"
        observer
        parallax
        navigation={images.length > 1}
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
          opacity={showNumber ? 1 : 0}
          display={images.length === 1 && 'none'}
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
          textShadow="0px 1px 4px rgb(0 0 0 / 30%)"
        >{`${currentSlide}/${images.length}`}</Text>
      </Swiper>
    </>
  )
}

export default PlaceCardCarousel

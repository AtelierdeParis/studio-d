import React from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Text,
} from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'

interface Props {
  control: Control
  name?: string
}

const PlaceSlider = ({ control, name = 'perimeter' }: Props) => {
  const { field } = useController({
    name,
    control,
    defaultValue: 75,
  })

  const onChange = (value) => {
    field.onChange(value)
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" mt={1}>
      <Slider
        aria-label="slider-ex-1"
        min={0}
        max={150}
        step={1}
        defaultValue={field.value}
        onChangeEnd={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text color="blue.500" whiteSpace="pre" w="80px" textAlign="right">
        {`${field.value} km`}
      </Text>
    </Flex>
  )
}

export default PlaceSlider

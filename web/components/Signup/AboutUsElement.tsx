import React, { Fragment } from 'react'
import { Box, Text, Image, Flex, Divider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Target } from '~pages/inscription/[target]'

const AboutUsElement = ({
  img,
  name,
  target,
}: {
  name: string
  img: string
  target: Target
}) => {
  const { t } = useTranslation('signup')

  return (
    <Fragment key={name}>
      <Divider opacity={0.5} />
      <Flex
        px={{ base: 4, md: 9 }}
        py={8}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Image
          src={img}
          alignSelf={{ base: 'center', sm: 'flex-start' }}
          w="48px"
          h="48px"
        />
        <Box ml={{ base: 0, sm: 10 }} mt={{ base: 4, sm: 0 }}>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="500"
            fontFamily="mabry medium"
            mb={2}
          >
            {t(`about.${target}.${name}.title`)}
          </Text>
          <Text>{t(`about.${target}.${name}.text`)}</Text>
        </Box>
      </Flex>
    </Fragment>
  )
}

export default AboutUsElement

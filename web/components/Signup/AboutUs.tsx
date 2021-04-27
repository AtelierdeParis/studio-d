import React, { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Text, Button, Image, Flex, Divider } from '@chakra-ui/react'
import { Target } from '~pages/inscription/[target]'

const list = [
  {
    img: '/assets/img/signup-icon1.svg',
    name: 'free',
  },
  {
    img: '/assets/img/signup-icon2.svg',
    name: 'reservation',
  },
  {
    img: '/assets/img/signup-icon3.svg',
    name: 'message',
  },
  {
    img: '/assets/img/signup-icon4.svg',
    name: 'confidentiality',
  },
]

interface IAboutUs {
  onClick: (skip: boolean) => void
  target: Target
}

const AboutUs = ({ onClick, target }: IAboutUs) => {
  const { t } = useTranslation('signup')

  return (
    <Flex maxW="46rem" direction="column" m="0 auto">
      <Text
        whiteSpace="pre-line"
        pb={{ base: 10, md: 18 }}
        px={{ base: 4, md: 20 }}
      >
        {t(`about.${target}.description`)}
      </Text>
      {list.map(({ img, name }) => (
        <Fragment key={name}>
          <Divider opacity={0.5} />
          <Flex
            px={{ base: 4, md: 9 }}
            py={8}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Image src={img} alignSelf={{ base: 'center', sm: 'flex-start' }} />
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
      ))}
      <Divider opacity={0.5} />
      <Flex
        mt={{ base: 6, md: 20 }}
        layerStyle="blueBox"
        py={{ base: 6, md: 10 }}
        px={{ base: 5, md: 18 }}
        direction="column"
        lineHeight="1.55"
        mx={{ base: 4, md: 0 }}
        mb={{ base: 0, md: 30 }}
      >
        <Box>
          <Text color="grayText.1">{t(`about.${target}.condition`)}</Text>
        </Box>
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
            onClick(true)
          }}
          colorScheme="blue"
          size="lg"
          alignSelf="center"
          mt={6}
        >
          {t(`about.btn`)}
        </Button>
      </Flex>
    </Flex>
  )
}

export default AboutUs

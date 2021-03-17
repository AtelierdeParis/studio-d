import React, { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Box,
  Text,
  Button,
  Image,
  Flex,
  Divider,
} from '@chakra-ui/react'

const list = [
  {
    img: '/assets/img/signup-icon1.png',
    name: 'free',
  },
  {
    img: '/assets/img/signup-icon2.png',
    name: 'reservation',
  },
  {
    img: '/assets/img/signup-icon3.png',
    name: 'message',
  },
  {
    img: '/assets/img/signup-icon4.png',
    name: 'confidentiality',
  },
]

interface IAboutUs {
  onClick: (skip: boolean) => void
}

const AboutUs = ({ onClick }: IAboutUs) => {
  const { t } = useTranslation('signup')
  return (
    <Flex maxW="46rem" direction="column" m="0 auto">
      <Text whiteSpace="pre-line" pb={18} px={20}>
        {t('about.description')}
      </Text>
      {list.map(({ img, name }) => (
        <Fragment key={name}>
          <Divider opacity={0.5} />
          <Flex px={9} py={8}>
            <Image src={img} alignSelf="flex-start" />
            <Box ml={10}>
              <Text fontSize="lg" fontWeight="500" mb={2}>
                {t(`about.${name}.title`)}
              </Text>
              <Text>{t(`about.${name}.text`)}</Text>
            </Box>
          </Flex>
        </Fragment>
      ))}
      <Divider opacity={0.5} />
      <Flex
        mt={20}
        layerStyle="blueBox"
        py={10}
        px={18}
        direction="column"
        lineHeight="1.55"
        mb={30}
      >
        <Box>
          {/* TODO: Replace with good value */}
          <Text color="grayText.1">{t(`about.condition`)}</Text>
        </Box>
        <Button
          onClick={() => onClick(true)}
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

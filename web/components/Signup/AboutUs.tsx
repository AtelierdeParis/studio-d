import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Text, Button, Flex, Divider, VStack } from '@chakra-ui/react'
import { Target } from '~pages/inscription/[target]'
import AboutUsElement from '~components/Signup/AboutUsElement'

const list = [
  {
    tabName: 'platform',
    elements: [
      {
        img: '/assets/img/signup-icon1.svg',
        name: 'free',
      },
    ],
  },
  {
    tabName: 'solidarity',
    elements: [
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
    ],
  },
  {
    tabName: 'projects',
    elements: [
      {
        img: '/assets/img/projects.svg',
        name: 'projects',
      },
    ],
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
      <VStack spacing={12}>
        {list.map(({ tabName, elements }) => (
          <Box>
            <Box
              borderWidth="1px 1px 0px 1px"
              borderColor="rgba(0,0,0,0.1)"
              borderRadius="10px 10px 0px 0px"
              display="inline-block"
              paddingX={4}
              paddingY={2}
            >
              <Text fontFamily="mabry" color="grayText.1">
                {t(`about.tabs.${tabName}`)}
              </Text>
            </Box>
            {elements.map(({ name, img }) => (
              <AboutUsElement
                key={name}
                img={img}
                name={name}
                target={target}
              />
            ))}
          </Box>
        ))}
      </VStack>

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

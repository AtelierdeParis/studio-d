import React from 'react'
import { SSRConfig } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Container,
  Heading,
  Text,
  Box,
  Accordion,
  VStack,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useFAQ } from '~hooks/useFAQ'
import { NextSeo } from 'next-seo'

const FAQ = () => {
  const { t } = useTranslation('common')
  const { data: faq } = useFAQ()

  return (
    <Container maxW="container.md" px={0}>
      <NextSeo title={t('title.faq')} />
      <Heading
        as="h1"
        textStyle="h1"
        layerStyle="mainTitle"
        textAlign="center"
        mx="auto"
      >
        {t('faq.title')}
      </Heading>
      {faq && faq.length > 0 ? (
        <VStack
          spacing={{ base: 10, md: 14 }}
          alignItems="flex-start"
          w="100%"
          pb={{ base: 0, md: 20 }}
        >
          {faq.map((category) => (
            <Box key={category.id} w="100%">
              <Text
                fontSize={{ base: 'md', md: '2xl' }}
                fontWeight="500"
                fontFamily="mabry medium"
                pb={5}
                pl={4}
              >
                {category.name}
              </Text>
              <Accordion allowMultiple allowToggle>
                {category.faq_questions.map(({ answer, question, id }) => (
                  <AccordionItem borderColor="gray.100" key={id}>
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton
                          _hover={{
                            bgColor: 'transparent',
                          }}
                          _focus={{ boxShadow: 'none' }}
                          _expanded={{ color: 'orange.500' }}
                        >
                          <Flex alignItems="center" w="100%">
                            <Box
                              py={1}
                              textAlign="left"
                              fontSize={{ base: 'sm', sm: 'md', md: '16px' }}
                              flex={1}
                            >
                              {question}
                            </Box>
                            <AccordionIcon
                              color="gray.300"
                              fontSize="1.7rem"
                              transform={`rotate(${
                                isExpanded ? '0deg' : '-90deg'
                              })`}
                            />
                          </Flex>
                        </AccordionButton>
                        <AccordionPanel pb={4} whiteSpace="pre-line">
                          {answer}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>{t('faq.empty')}</Text>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default FAQ

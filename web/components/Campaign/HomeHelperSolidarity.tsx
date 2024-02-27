import { Text, Flex, Button, StackProps, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from '~components/Link'
import { ROUTE_PROJECT } from '~constants'

const HomeHelperSolidarity = ({
  limitLines,
  isHome,
  ...props
}: {
  limitLines?: boolean
  isHome?: boolean
} & StackProps) => {
  const { t } = useTranslation('common')

  return (
    <VStack
      backgroundColor={'blue.200'}
      borderRadius="4px"
      borderTopLeftRadius={undefined}
      paddingX={8}
      paddingY={4}
      marginBottom={4}
      spacing={'1rem'}
      height={'auto'}
      {...props}
    >
      <Stack width="100%" spacing={6} direction={{ base: 'column', sm: 'row' }}>
        <VStack flex={4} justifyContent="flex-start" alignItems="flex-start">
          <Text as="span" fontWeight="bold" marginRight={1}>
            {t('solidarity.helper_title')}
          </Text>
          <Text noOfLines={limitLines ? { base: 4, md: 3, lg: 2 } : undefined}>
            {t('solidarity.helper')}
          </Text>
        </VStack>
        <Flex
          flex={1}
          justifyContent={{ base: 'flex-start', sm: 'flex-end' }}
          alignItems="center"
        >
          <Button variant={'blueFill'} as={Link} href={ROUTE_PROJECT}>
            {t('show')}
          </Button>
        </Flex>
      </Stack>
    </VStack>
  )
}

export default HomeHelperSolidarity

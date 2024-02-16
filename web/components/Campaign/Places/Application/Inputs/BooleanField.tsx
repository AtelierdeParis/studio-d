import { Box, Text, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useController, useFormContext } from 'react-hook-form'
import { checkBoxStyle } from '~components/Campaign/Places/Application/CampaignBookingScheduleItem'
import FormField from '~components/FormField'

const BooleanField = ({ label, name }: { label: string; name: string }) => {
  const { t } = useTranslation('place')

  const { errors, control } = useFormContext()

  const { field } = useController({
    name,
    control,
  })

  return (
    <FormField label={label} errors={errors[name]} flex={1}>
      <RadioGroup
        onChange={(value) => {
          console.log(value)
          field.onChange(value)
        }}
      >
        <HStack>
          <Box
            border="1px"
            flex={1}
            borderRadius="4px"
            borderColor={
              errors[name]
                ? 'red.500'
                : field.value === 'true'
                ? 'blue.500'
                : 'gray.200'
            }
            borderWidth={field.value === 'true' ? '2px' : '1px'}
            display="flex"
          >
            <Radio
              sx={checkBoxStyle}
              textTransform="capitalize"
              value={'true'}
              p={2}
              width="100%"
            >
              <Text textTransform={'capitalize'}>{t('global.yes')}</Text>
            </Radio>
          </Box>

          <Box
            border="1px"
            flex={1}
            borderRadius="4px"
            borderColor={
              errors[name]
                ? 'red.500'
                : field.value === 'false'
                ? 'blue.500'
                : 'gray.200'
            }
            borderWidth={field.value === 'false' ? '2px' : '1px'}
            cursor="pointer"
            display="flex"
          >
            <Radio
              sx={checkBoxStyle}
              textTransform="capitalize"
              value={'false'}
              p={2}
              width="100%"
            >
              <Text textTransform={'capitalize'}>{t('global.no')}</Text>
            </Radio>
          </Box>
        </HStack>
      </RadioGroup>
    </FormField>
  )
}

export default BooleanField

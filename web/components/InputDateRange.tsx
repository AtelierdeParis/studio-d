import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import {
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Text,
  useTheme,
  HStack,
  Box,
  Flex,
} from '@chakra-ui/react'
import fr from 'date-fns/locale/fr'
import { Control, useController } from 'react-hook-form'
import { format } from '~utils/date'
import Arrow from 'public/assets/img/chevron-right.svg'
import isSameDay from 'date-fns/isSameDay'
import isToday from 'date-fns/isToday'
import FormField from '~components/FormField'
import Remove from 'public/assets/img/remove.svg'

interface Props {
  control: Control
  placeholder?: string
  label?: string
}

const InputDateRange = ({ control, placeholder, label }: Props) => {
  const theme = useTheme()
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'range',
  })

  const { field: fieldStart } = useController({
    name: 'startDate',
    control,
  })

  const { field: fieldEnd } = useController({
    name: 'endDate',
    control,
  })

  const handleSelect = ({ range }) => {
    setRange(range)
    fieldStart.onChange(isToday(range.startDate) ? new Date() : range.startDate)
    fieldEnd.onChange(
      isSameDay(range.startDate, range.endDate) ? null : range.endDate,
    )
  }

  return (
    <Flex alignItems="center">
      <Popover>
        <PopoverTrigger>
          <Flex mt={0.5} cursor="pointer">
            <FormField label={label} labelStyle={{ mb: 0 }}>
              {fieldStart.value ? (
                <HStack alignItems="center" spacing={2} mt={1}>
                  <Text>{format(fieldStart.value)}</Text>
                  {fieldEnd.value &&
                    !isSameDay(
                      new Date(fieldStart.value),
                      new Date(fieldEnd.value),
                    ) && (
                      <>
                        <Arrow width="10px" height="10px" />
                        <Text>{format(fieldEnd.value)}</Text>
                      </>
                    )}
                </HStack>
              ) : (
                <Text color="gray.500" mt={1} cursor="pointer">
                  {placeholder}
                </Text>
              )}
            </FormField>
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          width="fit-content"
          _focus={{
            boxShadow: 'none',
            outline: 'none',
          }}
        >
          <PopoverBody>
            <DateRange
              minDate={new Date()}
              locale={fr}
              ranges={[range]}
              onChange={handleSelect}
              rangeColors={[theme.colors.orange['500']]}
              colors={theme.colors.orange['500']}
              showMonthAndYearPickers={false}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {fieldStart.value && (
        <Box
          as="span"
          alignSelf="flex-end"
          w="30px"
          mb={1}
          ml={3}
          cursor="pointer"
          onClick={() => {
            fieldStart.onChange('')
            fieldEnd.onChange('')
          }}
        >
          <Remove />
        </Box>
      )}
    </Flex>
  )
}

export default InputDateRange

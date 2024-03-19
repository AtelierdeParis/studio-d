import { Box, Button, Flex, VStack, Text, Input } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Reference } from '~@types/reference'
import ApplicationFormTitle from '~components/Campaign/Places/Application/ApplicationFormTitle'
import ReferenceItem from '~components/Campaign/Places/Application/References/ReferenceItem'
import ReferencesForm from './ReferencesForm'
import Add from 'public/assets/img/smallAdd.svg'

const REFERENCE_FIELDS = ['title', 'year', 'actors', 'coproducers', 'other']

const ApplicationReferences = () => {
  const [index, setIndex] = useState<number>()
  const { t } = useTranslation('place')
  const { control, register } = useFormContext()
  const { fields: references, append, remove, insert } = useFieldArray({
    control,
    name: 'references',
  })

  return (
    <VStack width="100%" alignItems="flex-start" maxWidth={'100%'}>
      <ApplicationFormTitle
        title={t('campaignApplication.references.title')}
        position="1."
        helper={t('campaignApplication.references.helper')}
      />
      <VStack width="100%" spacing={4}>
        {references?.length ? (
          references.map((reference, i) => (
            <>
              {REFERENCE_FIELDS.map((field) => (
                <Input
                  key={`references[${i}].${field}`}
                  name={`references[${i}].${field}`}
                  ref={register()}
                  defaultValue={reference[field]}
                  hidden
                />
              ))}
              <ReferenceItem
                reference={reference as Reference}
                index={i}
                key={i}
                handleDelete={() => remove(i)}
                handleEdit={() => setIndex(i)}
                isEdited={i === index}
              />
            </>
          ))
        ) : (
          <Box
            backgroundColor="grayBackground"
            p={3}
            width="100%"
            marginTop={2}
            borderRadius="4px"
          >
            <Text fontFamily="mabry medium">
              {t('campaignApplication.references.no_references')}
            </Text>
          </Box>
        )}
        {index !== undefined ? (
          <ReferencesForm
            handleCreate={(values) => {
              append(values)
            }}
            handleUpdate={(values) => {
              insert(index, values)
              remove(index + 1)
            }}
            clearIndex={() => setIndex(undefined)}
            currentReference={references[index] as Reference}
          />
        ) : references?.length < 5 ? (
          <Flex width="100%" justifyContent="flex-start">
            <Button
              variant="outline"
              colorScheme="blue"
              rightIcon={<Add />}
              size="lg"
              onClick={() => setIndex(null)}
            >
              {t('campaignApplication.references.add')}
            </Button>
          </Flex>
        ) : null}
      </VStack>
    </VStack>
  )
}

export default ApplicationReferences

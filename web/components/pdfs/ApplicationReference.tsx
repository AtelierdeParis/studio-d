import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import { ReactNode } from 'react-markdown'
import ApplicationHeader from '~components/pdfs/ApplicationHeader'

import ApplicationSection from '~components/pdfs/ApplicationSection'
import { BRAND_COLOR, FONT_SIZE, styles } from '~components/pdfs/pdfStyleUtils'
import { Application } from '~typings/api'

const ApplicationReference = ({
  reference,
  index,
  referencesTotal,
}: {
  reference: any
  index: number
  referencesTotal: number
}) => {
  return (
    <View
      style={{
        fontSize: FONT_SIZE,
        paddingVertical: 10,
        borderBottomWidth: index + 1 < referencesTotal ? 1 : 0,
        borderBottomColor: '#E5E5E5',
      }}
    >
      <Text style={{ color: BRAND_COLOR }}>Création {index + 1}</Text>
      <Text
        style={{ fontFamily: 'MabryMedium' }}
      >{`${reference?.title}, ${reference?.year}`}</Text>
      <Text>
        {`${reference?.actors} ${
          reference?.actors > 1 ? 'interprètes' : 'interprète'
        }`}
        <Text style={{ color: '#666666' }}>
          {(Boolean(reference?.other)
            ? [reference?.partners, reference?.other]
            : reference?.partners
          )?.join(', ')}
        </Text>
      </Text>
    </View>
  )
}

export default ApplicationReference

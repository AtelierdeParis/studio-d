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
import ApplicationReference from '~components/pdfs/ApplicationReference'
import { BRAND_COLOR, FONT_SIZE, styles } from '~components/pdfs/pdfStyleUtils'
import { Application } from '~typings/api'

const ApplicationSection = ({
  label,
  children,
  withBorder = true,
}: {
  label: ReactNode
  children: ReactNode
  withBorder?: boolean
}) => (
  <View
    style={{
      fontSize: FONT_SIZE,
      borderBottomWidth: withBorder ? 1 : 0,
      borderBottomColor: '#E5E5E5',
      paddingVertical: 12,
    }}
  >
    <Text style={{ marginBottom: 6, fontFamily: 'MabryMedium' }}>{label}</Text>
    <Text> {children}</Text>
  </View>
)

export default ApplicationSection

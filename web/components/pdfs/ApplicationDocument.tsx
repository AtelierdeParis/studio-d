import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import ApplicationCreation from '~components/pdfs/ApplicationCreation'

import ApplicationHeader from '~components/pdfs/ApplicationHeader'
import ApplicationInfo from '~components/pdfs/ApplicationInfos'
import ApplicationReference from '~components/pdfs/ApplicationReference'
import { BRAND_COLOR, styles } from '~components/pdfs/pdfStyleUtils'
import { Application } from '~typings/api'

// const Mabry = require('./../../public/assets/fonts/mabry-pro.otf')
// const MabryMedium = require('./../../public/assets/fonts/mabry-pro-medium.otf')

// Font.register({ family: 'Mabry', src: Mabry.default })
// Font.register({ family: 'MabryMedium', src: MabryMedium.default })

const ApplicationDocument = ({ application }: { application: Application }) => {
  const creations = application?.references as any[]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ApplicationHeader application={application} />

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>1.</Text> Références de créations
        </Text>

        <View style={styles.container}>
          {creations?.map((reference, i) => (
            <ApplicationReference
              reference={reference}
              index={i}
              referencesTotal={creations.length}
            />
          ))}
        </View>

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>2.</Text> Informations générales
        </Text>

        <ApplicationInfo application={application} />

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>3.</Text> Informations sur la
          création en cours
        </Text>

        <ApplicationCreation application={application} />
      </Page>
    </Document>
  )
}

export default ApplicationDocument

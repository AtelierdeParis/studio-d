import { Document, Font, Page, Text } from '@react-pdf/renderer'

import { styles } from '~components/pdfs/pdfStyleUtils'
import { Campaign, UsersPermissionsUser } from '~typings/api'

const Mabry = require('./../../public/assets/fonts/mabry-pro.otf')
const MabryMedium = require('./../../public/assets/fonts/mabry-pro-medium.otf')

Font.register({ family: 'Mabry', src: Mabry.default })
Font.register({ family: 'MabryMedium', src: MabryMedium.default })

const DividerPage = ({
  place,
  campaign,
}: {
  place: UsersPermissionsUser
  campaign: Campaign
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {place?.structureName} - {campaign?.title}
        </Text>
      </Page>
    </Document>
  )
}

export default DividerPage

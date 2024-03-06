import { Link, Text, View } from '@react-pdf/renderer'
import {
  BRAND_COLOR,
  FONT_SIZE,
  FONT_SIZE_BIG,
} from '~components/pdfs/pdfStyleUtils'

import { Application } from '~typings/api'
import { format } from '~utils/date'

const ApplicationHeader = ({ application }: { application: Application }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingBottom: 30,
        marginBottom: 30,
      }}
    >
      <View style={{ width: '33%' }}>
        <Text
          style={{
            fontSize: FONT_SIZE,
            backgroundColor: BRAND_COLOR,
            color: 'white',
            borderRadius: 4,
            paddingVertical: 4,
            paddingHorizontal: 8,
            marginBottom: 10,
          }}
        >
          {`Candidature n°${application?.id}`}
        </Text>
        <Text
          style={{
            fontSize: FONT_SIZE_BIG,
            fontFamily: 'MabryMedium',
            marginBottom: 10,
          }}
        >
          {/* @ts-expect-error */}
          {application?.disponibility?.espace?.name}
        </Text>
        <Text style={{ fontSize: FONT_SIZE_BIG }}>
          {`${format(application?.disponibility?.start, 'dd/MM')} → ${format(
            application?.disponibility?.end,
            'dd/MM',
          )}`}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, width: '33%' }}>
        <View style={{ fontSize: FONT_SIZE, lineHeight: 1.2 }}>
          <Text>Hofesch Schechter Company</Text>
          <Text>74 rue de Ménilmontant</Text>
          <Text>75020 Paris</Text>
        </View>
        <View style={{ marginTop: 14, fontSize: FONT_SIZE, lineHeight: 1.2 }}>
          <Text>Tél. : +33 (0)9 87 89 82 02</Text>
          <Text>Email : contact@compagnie.fr</Text>
          <Link
            src="mailto:hofesch-schechter.fr"
            style={{ textDecoration: 'underline', color: 'black' }}
          >
            hofesch-schechter.fr
          </Link>
        </View>
      </View>
      <View style={{ fontSize: FONT_SIZE, lineHeight: 1.2, width: '33%' }}>
        <Text>SIRET : 800 452 575 00062</Text>
        <Text>APE : 75012Z</Text>
        <Text>Assurance : Maif</Text>
        <Text>N° assurance : 75012Z</Text>
        <Text>Licence(s) : 57500062, 57500063</Text>
      </View>
    </View>
  )
}

export default ApplicationHeader

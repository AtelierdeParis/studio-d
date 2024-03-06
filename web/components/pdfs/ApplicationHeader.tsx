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
          <Text>{application?.company?.structureName}</Text>
          <Text>{application?.company?.address}</Text>
          <Text>{`${application?.company?.zipCode} ${application?.company?.city}`}</Text>
        </View>
        <View style={{ marginTop: 14, fontSize: FONT_SIZE, lineHeight: 1.2 }}>
          <Text>Tél. : {application?.company?.phone}</Text>
          <Text>Email : {application?.company?.email}</Text>
          <Link
            src={`mailto:${application?.company?.email}`}
            style={{ textDecoration: 'underline', color: 'black' }}
          >
            {application?.company?.website}
          </Link>
        </View>
      </View>
      <View style={{ fontSize: FONT_SIZE, lineHeight: 1.2, width: '33%' }}>
        <Text>SIRET : {application?.company?.siret}</Text>
        <Text>APE : {application?.company?.ape}</Text>
        <Text>Assurance : {application?.company?.insuranceName}</Text>
        <Text>N° assurance : {application?.company?.insuranceNumber}</Text>
        <Text>Licence(s) : {application?.company?.license}</Text>
      </View>
    </View>
  )
}

export default ApplicationHeader

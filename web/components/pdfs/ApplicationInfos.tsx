import { View } from '@react-pdf/renderer'
import ApplicationSection from '~components/pdfs/ApplicationSection'
import { styles } from '~components/pdfs/pdfStyleUtils'
import { Application } from '~typings/api'

const ApplicationInfo = ({ application }: { application: Application }) => {
  return (
    <View style={styles.container}>
      <ApplicationSection
        //   @ts-expect-error
        label={`Avez-vous déjà été soutenu·e par ${application?.disponibility?.espace?.users_permissions_user.structureName}?`}
      >
        {Boolean(application?.already_supported) ? 'Oui' : 'Non'}
      </ApplicationSection>

      <ApplicationSection
        withBorder={false}
        label="C.V. | Biographie du / de la chorégraphe"
      >
        {application?.cv}
      </ApplicationSection>
    </View>
  )
}

export default ApplicationInfo

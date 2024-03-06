import { View } from '@react-pdf/renderer'
import ApplicationSection from '~components/pdfs/ApplicationSection'
import { styles } from '~components/pdfs/pdfStyleUtils'
import { Application } from '~typings/api'

const ApplicationCreation = ({ application }: { application: Application }) => {
  return (
    <View style={styles.container}>
      <ApplicationSection withBorder label="Titre">
        {application?.creation_title}
      </ApplicationSection>
      <ApplicationSection withBorder label="Nombre de danseurs·ses">
        {application?.creation_dancers}
      </ApplicationSection>
      <ApplicationSection withBorder label="Résumé du dossier">
        {application?.creation_summary}
      </ApplicationSection>
      <ApplicationSection
        withBorder
        label="Soutiens ou partenaires déjà confirmés"
      >
        {application?.creation_partnerships}
      </ApplicationSection>
      <ApplicationSection withBorder label="Besoins techniques">
        {application?.creation_techical_requirements}
      </ApplicationSection>
      <ApplicationSection
        withBorder
        label="Avez-vous besoin d’un hébergement ?"
      >
        {Boolean(application?.creation_accomodation) ? 'Oui' : 'Non'}
      </ApplicationSection>
    </View>
  )
}

export default ApplicationCreation

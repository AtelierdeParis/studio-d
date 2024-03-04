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

const Mabry = require('./../../public/assets/fonts/mabry-pro.otf')
const MabryMedium = require('./../../public/assets/fonts/mabry-pro-medium.otf')

Font.register({ family: 'Mabry', src: Mabry.default })
Font.register({ family: 'MabryMedium', src: MabryMedium.default })

const BRAND_COLOR = '#283583'
const FONT_SIZE = 12

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Mabry',
    padding: 20,
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 10,
    marginBottom: 10,
  },
  container: {
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 1.2,
  },
})

const Section = ({
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

const ApplicationDocument = () => {
  const creations = [1, 2, 3]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
          <View>
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
              Candidature n°59B63
            </Text>
            <Text style={{ fontSize: 17, fontFamily: 'MabryMedium' }}>
              Grand plateau
            </Text>
            <Text style={{ fontSize: 17 }}>05/03 → 09/03</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ fontSize: FONT_SIZE, lineHeight: 1.2 }}>
              <Text>Hofesch Schechter Company</Text>
              <Text>74 rue de Ménilmontant</Text>
              <Text>75020 Paris</Text>
            </View>
            <View
              style={{ marginTop: 14, fontSize: FONT_SIZE, lineHeight: 1.2 }}
            >
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
          <View style={{ fontSize: FONT_SIZE, lineHeight: 1.2 }}>
            <Text>SIRET : 800 452 575 00062</Text>
            <Text>APE : 75012Z</Text>
            <Text>Assurance : Maif</Text>
            <Text>N° assurance : 75012Z</Text>
            <Text>Licence(s) : 57500062, 57500063</Text>
          </View>
        </View>

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>1.</Text> Références de créations
        </Text>

        <View style={styles.container}>
          {creations.map((_, i) => (
            <View
              style={{
                fontSize: FONT_SIZE,
                paddingVertical: 10,
                borderBottomWidth: i + 1 < creations.length ? 1 : 0,
                borderBottomColor: '#E5E5E5',
              }}
            >
              <Text style={{ color: BRAND_COLOR }}>Création {i + 1}</Text>
              <Text style={{ fontFamily: 'MabryMedium' }}>
                Grand Finale, 2020
              </Text>
              <Text>
                10 interprètes.{' '}
                <Text style={{ color: '#666666' }}>
                  Nom d’un coproducteur, nom d’un coproducteur.
                </Text>
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>2.</Text> Informations générales
        </Text>

        <View style={styles.container}>
          <Section label="Avez-vous déjà été soutenu·e par l’Étoile du Nord, scène conventionnée ?">
            Oui
          </Section>

          <Section
            withBorder={false}
            label="C.V. | Biographie du / de la chorégraphe"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
            sem sit amet sem hendrerit rutrum. In vitae enim ut ipsum varius
            convallis. Vivamus vehicula purus ut nunc ullamcorper interdum.
            Pellentesque feugiat condimentum quam, vel rhoncus lectus cursus
            imperdiet. Fusce bibendum ullamcorper mi non molestie. Ut tempor ex
            a velit pulvinar consectetur. Nulla ut sollicitudin ex, vitae
            lacinia lacus. Phasellus pellentesque elit mauris, sit amet euismod
          </Section>
        </View>

        <Text style={styles.title}>
          <Text style={{ color: BRAND_COLOR }}>3.</Text> Informations sur la
          création en cours
        </Text>

        <View style={styles.container}>
          <Section withBorder label="Titre">
            L’équilibre du rêve
          </Section>
          <Section withBorder label="Nombre de danseurs·ses">
            8
          </Section>
          <Section withBorder label="Soutiens ou partenaires déjà confirmés">
            Sed dictum lacus eget orci venenatis, ut pellentesque mauris
            fermentum.
          </Section>
          <Section withBorder label="Besoins techniques">
            Aliquam congue quam non molestie hendrerit. Vivamus ut ipsum nec
            orci maximus volutpat. Sed dictum lacus eget orci venenatis, ut
            pellentesque mauris fermentum.
          </Section>
          <Section withBorder label="Avez-vous besoin d’un hébergement ?">
            Non
          </Section>
        </View>
      </Page>
    </Document>
  )
}

export default ApplicationDocument

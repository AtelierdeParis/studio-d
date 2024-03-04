const React = require('react')
const {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} = require('@react-pdf/renderer')

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const ApplicationPdf = ({ applicationData }) => {
  const content = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { color: 'red' }, `Name: BBBBBBBBBB`),
        React.createElement(Text, { color: 'red' }, `Email:AAAAAAA`),
        // Add more fields as needed
      ),
    ),
  )
  console.log(content)
  return content
}

module.exports = ApplicationPdf

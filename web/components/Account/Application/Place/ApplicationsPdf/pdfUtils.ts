import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PDFDocument } from 'pdf-lib'

const mergePdfs = async (pdfsToMerges: ArrayBuffer[]) => {
  const mergedPdf = await PDFDocument.create()
  const actions = pdfsToMerges.map(async (pdfBuffer) => {
    try {
      const pdf = await PDFDocument.load(pdfBuffer, {
        throwOnInvalidObject: false,
      })
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page)
      })
    } catch (e) {
      console.log('error', e)
    }
  })
  await Promise.all(actions)
  const mergedPdfFile = await mergedPdf.save()
  return mergedPdfFile
}

export const downloadPdf = async (
  input,
  fileName,
  creation_file_url = null,
  isMulti = false,
) => {
  const canvas = await html2canvas(input)
  if (canvas) {
    const marginX = 5
    const marginY = 10

    const imgData = canvas.toDataURL('image/jpeg')
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const pdf = new jsPDF('p', 'mm', 'a4', true)

    const pageWidth = pdf.internal.pageSize.getWidth() - marginX * 2
    const pageHeight = pdf.internal.pageSize.getHeight() - marginY * 2

    const XRatio = pageWidth / imgWidth

    let heightLeft = imgHeight * XRatio
    let positionY = 0

    while (heightLeft >= 0) {
      positionY = heightLeft - imgHeight * XRatio
      if (heightLeft !== imgHeight * XRatio) {
        pdf.addPage()
      }
      pdf.addImage(
        imgData,
        'JPEG',
        marginX,
        positionY,
        imgWidth * XRatio,
        imgHeight * XRatio,
        'FAST',
      )
      heightLeft -= pageHeight
    }

    if (creation_file_url) {
      const response = await fetch(creation_file_url)
      const creationFileArrayBuffer = await response.arrayBuffer()
      const mergedPdfs = await mergePdfs([
        pdf.output('arraybuffer'),
        creationFileArrayBuffer,
      ])
      const blob = new Blob([mergedPdfs], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName + '.pdf'
      link.click()
      URL.revokeObjectURL(url)
    } else {
      pdf.save(fileName + '.pdf')
    }
  }
}

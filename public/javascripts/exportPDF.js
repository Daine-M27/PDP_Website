function downloadPDF() {
  var element = document.getElementById('svgBody')
  var opt = {
    margin: 0,
    filename: 'MEGABATTEN Submittal',
    html2canvas: {
      scale: 2
    },
    image: {
      type: 'jpeg',
      quality: .80
    },
    jsPDF: {
      unit: 'in',
      format: [11.25, 17.25],
      orientation: 'landscape',
      compress: true
    },
    pagebrake: {
      mode: 'css',
      before: ['#sheet2','#sheet3','#sheet4','#sheet5']
    }
  }

  html2pdf().set(opt).from(element).save()
}

function downloadLabelPDF() {
  console.log('download labels sheet')
  var element = document.getElementById('tabelBody')
  var opt = {
    pagebrake: {
      mode: 'avoid-all'
    },
    margin: .50,
    filename: 'Custom Labels',
    html2canvas: {
      scale: 2
    },
    image: {
      type: 'jpeg',
      quality: .80
    },
    jsPDF: {
      unit: 'in',
      format: [11, 8.5],
      orientation: 'portrait',
      compress: true
    },
  }

  html2pdf().set(opt).from(element).save()
}

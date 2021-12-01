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

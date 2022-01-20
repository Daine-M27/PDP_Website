console.log('label')

function addLabels() {
  const pn = encodeURIComponent(document.getElementById('battenInput').value)

  $.get(`/label/inputs/${pn}`, (data) => {
    //console.log(data)
    if(data === null){
      console.log('no data')
    } else{
      document.getElementById('formWrapper').innerHTML += data
    }    
  });
}
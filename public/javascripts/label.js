console.log('label')

function addLabels() {
  $.get(`/label/inputs`, (data) => {
    console.log(data)
    if(data === null){
      console.log('no data')
      
    } else{
      document.getElementById('formWrapper').innerHTML = data
    }    
  });
}
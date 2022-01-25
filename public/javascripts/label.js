console.log('label')

function addLabels() {
  const pn = encodeURIComponent(document.getElementById('battenInput').value)
  const allPartNumbers = [...document.getElementById('battensData').options].map(opt => opt.value)
  
  if(!allPartNumbers.includes(pn)) {
    alert('Please select a valid part number')
  } else {
    $.get(`/label/inputs/${pn}`, (data) => {
      //console.log(data)
      if(data === null){
        console.log('no data')
      } else{
        document.getElementById('formWrapper').insertAdjacentHTML('beforeend', data);
        document.getElementById('labelGenerator').classList.add('display-none')

      }    
    });
  }  
}
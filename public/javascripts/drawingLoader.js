console.log('drawing loader')
console.log(id)

var intervalId;
var counter = 1;

function loaderOff(){
  $(`div.loader`).addClass('display-none')
  $(`.loaderMessage`).addClass('display-none')  

}

function getData(){
  try {
    $.get(`/drawing/loader/${id}`, (data) => {
      // console.log(data)    
      if (data === false) {  
        console.log(counter)
        counter = counter + 1;
      } else {
        loaderOff()
        counter = 10;
        document.getElementById('svgBody').insertAdjacentHTML('beforeend', data);        
      }          
    });    
  } catch (error) {
    // need to add client output message    
    console.log(error)
  } 
}

window.onload = () => {  
  if(intervalId){
    return;
  }  
  intervalId = setInterval(() => {
    if (counter <= 5){
      getData()
    }
    else {
      clearInterval(intervalId)
      intervalId = null
    }
  }, 10000);  
};
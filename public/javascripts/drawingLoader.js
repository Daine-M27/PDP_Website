console.log('drawing loader')
console.log(id)

function loaderOff(sheetNumber){
  $(`#${sheetNumber} > div.loader`).addClass('display-none')
  $(`#${sheetNumber} > .loaderMessage`).addClass('display-none')     

}

window.onload = async () => { 
  
  try {
    await $.get(`/drawing/loader/sheet1/${id}`, (data) => {
      loaderOff('sheet1')
      document.getElementById('sheet1').insertAdjacentHTML('beforeend', data);
    });
    await $.get(`/drawing/loader/sheet2/${id}`, (data) => {
      loaderOff('sheet2')      
      document.getElementById('sheet2').insertAdjacentHTML('beforeend', data);
    });
    await $.get(`/drawing/loader/sheet3/${id}`, (data) => {      
      loaderOff('sheet3')
      document.getElementById('sheet3').insertAdjacentHTML('beforeend', data);
    });
    await $.get(`/drawing/loader/sheet4/${id}`, (data) => {      
      loaderOff('sheet4')
      document.getElementById('sheet4').insertAdjacentHTML('beforeend', data);
    });
    await $.get(`/drawing/loader/sheet5/${id}`, (data) => {      
      loaderOff('sheet5')
      document.getElementById('sheet5').insertAdjacentHTML('beforeend', data);
    });


  } catch (error) {
    // need to add client output message
    console.log(error)
  }
};
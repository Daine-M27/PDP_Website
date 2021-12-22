let numBattens = 1;

// add item to quote list
function addBatten() {
  // console.log('batten added');
  const pnValue = document.getElementById('battenInput').value;
  const qtyValue = document.getElementById('battenQty').value;

  if (!pnValue) {
    alert('Please choose a MEGABATTEN!')
  } else {
    $("#battens").append(`
    <li id="quoteItem${numBattens}" style="margin-bottom: 6px; list-style-type: none; border: 1px solid lightgray; padding: 10px; margin-left:-40px">
      <label for="item-${numBattens}"> Part Number:
      <br>
      <input type="text" id="batten${numBattens}" name="item-${numBattens}-pn" style="min-width:350px"></input>
      <br>
      <br>
      <label for="item-${numBattens}-Qty"> Quantity:
      <br>
      <input type="text" id="batten${numBattens}Qty" name="item-${numBattens}-qty" style="max-width:15px"></input>
      <br>
      <button type="button" onclick="deleteItem('quoteItem${numBattens}')" style="margin-top: 6px"> Remove Item
    </li>
    `)
  
    document.getElementById(`batten${numBattens}`).value = `${pnValue}`
    document.getElementById(`batten${numBattens}Qty`).value = `${qtyValue}`
    // increment number of items in bom
    numBattens++
    // reset batten input field
    document.getElementById("battenInput").value = "";
    // reset qty input 
    $('#battenQty option:selected').prop('selected', false);
  }

  const liValues = $('ul li')
  if(liValues.length > 0){
    $('#submitButton').prop('disabled', false)
  }
}

// delete item from quote list
function deleteItem(idValue){
  $(`#${idValue}`).remove()

  const liValues = $('ul li')
  if(liValues.length < 1){
    $('#submitButton').prop('disabled', true)
  }
}


function submitData(){
  
}

// address autocomplete code
var placeSearch, autocomplete;

// var componentForm = {
//   street_number: 'short_name',
//   route: 'long_name',
//   locality: 'long_name',
//   administrative_area_level_1: 'short_name',
//   country: 'long_name',
//   postal_code: 'short_name'
// };

// var componentForm2 = {
//   street_number2: 'short_name',
//   route2: 'long_name',
//   locality2: 'long_name',
//   administrative_area_level_12: 'short_name',
//   country2: 'long_name',
//   postal_code2: 'short_name'
// };

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('projectautocomplete')),
      {types: ['geocode']});

  autocomplete2 = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('customerautocomplete')),
      {types: ['geocode']});
  
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  // autocomplete.addListener('place_changed', fillInAddress);
  // autocomplete2.addListener('place_changed', fillInAddress2);
}

// function fillInAddress() {
//   // Get the place details from the autocomplete object.
//   var place = autocomplete.getPlace();

//   for (var component in componentForm) {
//     document.getElementById(component).value = '';
//     document.getElementById(component).disabled = false;
//   }

//   // Get each component of the address from the place details
//   // and fill the corresponding field on the form.
//   for (var i = 0; i < place.address_components.length; i++) {
//     var addressType = place.address_components[i].types[0];
//     if (componentForm[addressType]) {
//       var val = place.address_components[i][componentForm[addressType]];
//       document.getElementById(addressType).value = val;
//     }
//   }
// }

// function fillInAddress2() {
//   // Get the place details from the autocomplete object.
//   var place = autocomplete2.getPlace();

//   for (var component in componentForm2) {
//     document.getElementById(component).value = '';
//     document.getElementById(component).disabled = false;
//   }

//   // Get each component of the address from the place details
//   // and fill the corresponding field on the form.
//   for (var i = 0; i < place.address_components.length; i++) {
//     var addressType = place.address_components[i].types[0];
//     if (componentForm2[addressType]) {
//       var val = place.address_components[i][componentForm2[addressType]];
//       document.getElementById(addressType).value = val;
//     }
//   }
// }


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
      autocomplete2.setBounds(circle.getBounds());
    });
  }
}

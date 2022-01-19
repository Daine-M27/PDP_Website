let numBattens = 1;

// add item to quote list
function addBatten() {
  // console.log('batten added');
  const pnValue = document.getElementById('battenInput').value;
  const qtyValue = document.getElementById('battenQty').value;
  const clabeling = document.getElementById('clabeling').value;

  if (!pnValue) {
    alert('Please choose a MEGABATTEN!')
  
  }
  else if(!clabeling) {
    alert('Please choose Custom Labels yes or no!')
  }
  else {
    $("#battens").append(`
    <li id="quoteItem${numBattens}" style="margin-bottom: 6px; list-style-type: none; border: 1px solid lightgray; padding: 10px; margin-left:-40px">
      <label for="item-${numBattens}"> Part Number:
      <br>
      <input type="text" id="batten${numBattens}" name="item-${numBattens}-pn" style="min-width:350px; margin-bottom: 6px"></input>
      <br>
      <label for="item-${numBattens}-Qty"> Qty:
      <input type="text" id="batten${numBattens}Qty" name="item-${numBattens}-qty" style="max-width:25px"></input>
      <label for="item-${numBattens}-cl" style="margin-left: 35px"> Custom Labeling:
      <input type="text" id="batten${numBattens}cl" name="item-${numBattens}-cl" style="max-width:20px"></input>
      <br>
      <button type="button" onclick="deleteItem('quoteItem${numBattens}')" style="margin-top: 6px"> Remove Item
    </li>
    `)
  
    document.getElementById(`batten${numBattens}`).value = `${pnValue}`
    document.getElementById(`batten${numBattens}Qty`).value = `${qtyValue}`
    document.getElementById(`batten${numBattens}cl`).value = `${clabeling}`
    // increment number of items in bom
    numBattens++
    // reset batten input field
    document.getElementById("battenInput").value = "";
    // reset qty input 
    $('#battenQty option:selected').prop('selected', false);
    $('#clabeling option:selected').prop('selected', false);
    
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

// address autocomplete code
var placeSearch, autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('projectautocomplete')),
      {types: ['geocode']});

  autocomplete2 = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('customerautocomplete')),
      {types: ['geocode']});  
}


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

let numBattens = 1;

function addBatten() {
  console.log('batten added');
  const container = document.getElementById('battens');
  const pnValue = document.getElementById('battenInput').value;
  const qtyValue = document.getElementById('battenQty').value;

  $("#battens").append(`
  <li id="quoteItem${numBattens}" style="margin-bottom: 6px; list-style-type: none; border: 1px solid lightgray; padding: 10px; margin-left:-40px">
    Part Number: <span style="margin-left: 6px">${pnValue}</span>
    <br>
    Qty: <span style="margin-left: 6px">${qtyValue}</span>
    <br>
    <button type="button" onclick="deleteItem('quoteItem${numBattens}')" style="margin-top: 6px"> Remove Item
  </li>
  `)

  numBattens++
  document.getElementById("battenInput").value = ""; 
  $('#battenQty option:selected').prop('selected', false);
}


function deleteItem(idValue){
  $(`#${idValue}`).remove()
}

//----------------------------- initial choice loaded on page load -----------------------------//
// window.onload = async () => {  
//   try {
    

//   } catch (error) {
//     // need to add client output message
//     console.log(error)
//   }
// };
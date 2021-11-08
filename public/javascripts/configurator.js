var getNextChoice = async (id) => {
  var ChildDecisionNodeID = $(`#${id} option:selected`).val()
  console.log(ChildDecisionNodeID)
  await $.get(`/choices/nextChoice/${ChildDecisionNodeID}`, (data) => {
    console.log(data)
    addChoiceRow(data)
  })
  
}

// add new choice when called
var addChoiceRow = (choiceData) => {
  // get main container for innerHTML operation
  var choiceContainer = document.getElementById('contents')
  
  // create option for each catalog in componenet
  var pulldownOptions = (id) => {    
    choiceData.Catalogs.forEach(catalog => {
      $(`#${id}`).append(`<option class="select-option" value="${catalog.ChildDecisionNodeID}">${catalog._catalogDescription}</option>`)      
    });
  }
  
  // setup main select element to append data
  choiceContainer.innerHTML = 
  `<div id=${choiceData.ParentDecisionNodeID}>
      <h2 style='clear:left;margin-top:0em;'>${choiceData.ComponentTypeName}</h2>
      <select id='choice${choiceData.ComponentTypeName}' name='${choiceData.ComponentTypeName}' onchange='getNextChoice("choice${choiceData.ComponentTypeName}")'>
        <option disabled selected class='select-option' value='' > -- select and option -- </option>
      </select>
    </div>`
  
  // add options to select element
  pulldownOptions(`choice${choiceData.ComponentTypeName}`)
}


// initial choice loaded on page load
window.onload = async () => {

  await $.get('/choices/firstChoice', (data) => {
    addChoiceRow(data)
  })
}
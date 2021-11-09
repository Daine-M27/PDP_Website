// get next choice from api
const getNextChoice = async (id) => {
  const ChildDecisionNodeID = $(`#${id} option:selected`).val()
  console.log(ChildDecisionNodeID)
  await $.get(`/choices/nextChoice/${ChildDecisionNodeID}`, (data) => {
    console.log(data)
    addChoiceRow(data)
  })
  
}

// add new choice when called
const addChoiceRow = (choiceData) => {
  // get main container for innerHTML operation
  const choiceContainer = document.getElementById('contents')
  const elemId = `choice${choiceData.ParentDecisionNodeID}`
  
  // create option for each catalog in componenet
  const pulldownOptions = (id) => {    
    choiceData.Catalogs.forEach(catalog => {
      console.log(catalog)
      $(`#${id}`).append(`<option class="select-option" value="${catalog.ChildDecisionNodeID}">${catalog._catalogDescription}</option>`)      
    });
  }
  
  // setup main select element to append data
  choiceContainer.innerHTML += 
  `<div style='margin-bottom:.5em' id=${choiceData.ParentDecisionNodeID}>
      <h2 style='clear:left;margin-top:0em; margin-bottom:0em'>${choiceData.ComponentTypeName}</h2>
      <select id='${elemId}' name='${choiceData.ComponentTypeName}' onchange='getNextChoice("${elemId}")'>
        <option disabled selected class='select-option' value='' > -- select and option -- </option>        
      </select>
    </div>`
  
  // add options to select element
  pulldownOptions(elemId)
}


// initial choice loaded on page load
window.onload = async () => {
  
  // await $.get(`/choices/nextChoice/2033`, (data) => {
  //   console.log(data)
  //   addChoiceRow(data)
  // })

  await $.get('/choices/firstChoice', (data) => {
    // console.log(data)
    addChoiceRow(data)
  })
}
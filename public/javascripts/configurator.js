




/**
 * Function to get the next choice based on the id passed from the last choice made
 * @param {string} id
 */
const getNextChoice = async (id, skipped) => {
  let ChildDecisionNodeID;  
  if (skipped !== true) {
    ChildDecisionNodeID = $(`#${id} option:selected`).val();
  } else {
    ChildDecisionNodeID = id
  }  
  console.log(id);
  $(`#${id}`).parent().nextAll().remove()
  
  await $.get(`/choices/nextChoice/${ChildDecisionNodeID}`, (data) => {
    console.log(data)
    if(data === null){
      console.log('end of choices')
    } else{
      addChoiceRow(data);
    }    
  });
};

/**
 * Function to add a row choice to the DOM
 * @param {object} choiceData
 */
const addChoiceRow = (choiceData) => {
  // check if choice is valid for website
  if (choiceData.ComponentAvailableOnWebsite !== true) {
    // console.log(choiceData)
    // check if more than one catalog for non web componenets
    if (choiceData.Catalogs.length > 1) {
      // check if decision is Run termination and handle ----------------------------------------------///////////////////////
      console.log('more than one catalog')
    } else {
      console.log('single choice')
      getNextChoice(choiceData.Catalogs[0].ChildDecisionNodeID, true)
    }
  } else {
    // get main container for innerHTML operation
    const choiceContainer = document.getElementById("contents");
    const elemId = `choice${choiceData.ParentDecisionNodeID}`;
    // create option for each catalog in componenet
    const pulldownOptions = (id) => {
      choiceData.Catalogs.forEach((catalog) => {
        // console.log(catalog)
        if(catalog._catalogAvailableOnWebsite === true){
          $(`#${id}`).append(
            `<option class="select-option" value="${catalog.ChildDecisionNodeID}">${catalog._catalogDescription}</option>`
          );
        }  
      });
    };
    // setup main select element to append data
    choiceContainer.innerHTML += 
    `
      <div class='select-Container' style='margin-bottom:.5em' id=${choiceData.ParentDecisionNodeID}>
        <h2 style='clear:left;margin-top:0em; margin-bottom:0em'>${choiceData.ComponentTypeName}</h2>
          <select id='${elemId}' name='${choiceData.ComponentTypeName}' onchange='getNextChoice("${elemId}")'>
            <option disabled selected class='select-option' value='' > -- select and option -- </option>        
          </select>
      </div>
    `;
    // add options to select element
    pulldownOptions(elemId);
  }
};

/**
 * Skip a choice if not needed in interface
 */
const skipChoice = () => {};

// initial choice loaded on page load
window.onload = async () => {
  const partNumber = []

  try {
    await $.get("/choices/firstChoice", (data) => {
      console.log(data)
      addChoiceRow(data);
    });
  } catch (error) {
    // need to add client output message
    console.log(error);
  }
};

// // class for collecting selection data
// class Selection {
//   constructor(options){
//     Object.assign(this, options)
//   }
// }
// // array to hold each choice based on index
// const selectionsObject = []


const SeriesDataObjectString = (componentObject, catalogObject) => {
  const outputObject = `{
    "ComponentTypeName": "${componentObject.ComponentTypeName}",
    "OrderOfAppearance": ${componentObject.OrderOfAppearance},
    "ProductComponentTypeID": ${componentObject.ProductComponentTypeID},
    "_catalogDescription": "${catalogObject._catalogDescription}",
    "_catalogID": "${catalogObject._catalogID}",
    "<CatalogIdentifierID>k__BackingField": ${catalogObject["<CatalogIdentifierID>k__BackingField"]},
    "ChildDecisionNodeID": ${catalogObject.ChildDecisionNodeID},
    "ParentDecisionNodeID": ${catalogObject.ParentDecisionNodeID}
  }`

  return outputObject
}



/**
 * Function to get the next choice based on the id passed from the last choice made
 * @param {string} id
 */
const getNextChoice = async (id, skipped) => {  
  
  
  let ChildDecisionNodeID; // get id for next choie route
  const selectedOption = $(`#${id} option:selected`).text(); // get text of selected option
  
  // if choice is skipped, use supplied value  
  if (skipped !== true) {
    ChildDecisionNodeID = $(`#${id} option:selected`).val();
  } else {
    ChildDecisionNodeID = id
  }  
  
  // remove all selections after this one
  $(`#${id}`).parent().nextAll().remove()

  // remove any text which has been previously set
  $(`#${id} ~ .selection`).remove()
  
  // set selected text
  $(`#${id}`).after(`
    <div class='selection'>
      <p>Selected: <strong>${selectedOption}</strong>
      </p
    </div>
  `)
  
  // add next choice row
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
            `<option class="select-option" value="${catalog.ChildDecisionNodeID}" data-object='${SeriesDataObjectString(choiceData, catalog)}'>${catalog._catalogDescription}</option>`
          );
        }  
      });
    };
    
    // setup main select element to append data
    choiceContainer.innerHTML += 
    `
      <div class='select-Container' style='margin-bottom:.5em; border-bottom:1px' id=${choiceData.ParentDecisionNodeID}>
        <h2 style='clear:left;margin-top:0em; margin-bottom:0em'>${choiceData.ComponentTypeName}</h2>
        <select id='${elemId}' name='${choiceData.ComponentTypeName}' data-seriesInfo='' onchange='getNextChoice("${elemId}")'>
          <option disabled selected class='select-option' value='' > -- select and option -- </option>        
        </select>
      </div>
    `;
    // add options to select element
    pulldownOptions(elemId);
  }
  // scroll to bottom of page
  window.scrollTo(0, document.body.scrollHeight)
};

//----------------------------- initial choice loaded on page load -----------------------------//
window.onload = async () => { 

  try {
    await $.get("/choices/firstChoice", (data) => {
      // console.log(data)
      addChoiceRow(data);
    });
  } catch (error) {
    // need to add client output message
    console.log(error);
  }
};

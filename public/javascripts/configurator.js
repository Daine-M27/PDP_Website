/**
 * Function to assemble string    
 * @param {object} componentObject 
 * @param {object} catalogObject 
 * @returns string
 */
 const SeriesDataObjectString = (componentObject, catalogObject) => {
  const outputObject = `{
    "ComponentTypeName": "${componentObject.ComponentTypeName}",
    "OrderOfAppearance": ${componentObject.OrderOfAppearance},
    "ProductComponentTypeID": ${componentObject.ProductComponentTypeID},
    "CatalogDescription": "${componentObject.ComponentTypeName.includes('Length')  ?  catalogObject.CatalogID : catalogObject.CatalogDescription}",
    "CatalogID": "${catalogObject.CatalogID}",
    "CatalogIdentifierID": ${catalogObject.CatalogIdentifierID},
    "ChildDecisionNodeID": ${catalogObject.ChildDecisionNodeID},
    "ParentDecisionNodeID": ${catalogObject.ParentDecisionNodeID},
    "ExcludeFromPartNumber": "${catalogObject.ExcludeFromPartNumber}"
  }`
  return outputObject
}

/**
 * Creates a new row in dom
 * @param {object} componentData 
 */
function addChoiceRow(componentData){
  // console.log(componentData)

  // variables
  const choiceContainer = document.getElementById("contents") // main container to add elements to
  const elemId = `${componentData.ParentDecisionNodeID}Select` // Id of component select element
  const noteId = `${componentData.ParentDecisionNodeID}Notes`
  
  // create option for each catalog in componenet
  const pulldownOptions = (id) => {
    componentData.Catalogs.forEach((catalog) => {
      // console.log(catalog)
      if(catalog.CatalogAvailableOnWebsite === true){
        $(`#${id}`).append(
          `<option class="select-option" value="${catalog.CatalogID}" data-child='${catalog.ChildDecisionNodeID}' data-object='${SeriesDataObjectString(componentData, catalog)}'>${catalog.CatalogDescription}</option>`
        );
      } else {
        $(`#${id}`).append(
          `<option class="select-option display-none" value="${catalog.CatalogID}" data-child='${catalog.ChildDecisionNodeID}' data-object='${SeriesDataObjectString(componentData, catalog)}'>${catalog.CatalogDescription}</option>`
        );
      }  
    });
  }
  // create notes text for component
  const componentNotes = (id) => {
    componentData.Notes.forEach((note) => {
      $(`#${id}`).append(`<li>${note.Note}</li>`)
    })
  }
  // write HTML to DOM
  const writeHTML = (displayClass) => {
    // setup main select element to append data
    choiceContainer.innerHTML += 
    `
      <div class='select-Container ${displayClass}' style='margin-bottom:.5em; border:1px solid #eeeeee; padding:10px' id='${componentData.ParentDecisionNodeID}Container'>
        <h2 style='clear:left;margin-top:0em; margin-bottom:0em'>${componentData.ComponentTypeName}</h2>
        <select id='${elemId}' name='${componentData.ComponentTypeName}' onchange='next("${elemId}")'>
          <option disabled selected class='select-option' value='' > -- select an option -- </option>        
        </select>
        <div >
          <ul id='${noteId}'></ul>
        </div>
      </div>
    `;

    // add options to select element
    pulldownOptions(elemId);
    // add notes
    if (componentData.Notes !== null) {
      componentNotes(noteId);
    }
    
  }

  if (componentData.ComponentTypeName.includes('Lead/Whip Length (ft)') && componentData.Catalogs.length < 2) {
    componentData.ComponentAvailableOnWebsite = false
    console.log(componentData.ComponentAvailableOnWebsite, ':' ,componentData.ComponentTypeName) 
  }

  // check if componenet is for web or not
  if (componentData.ComponentAvailableOnWebsite === true) {
    // render component with display inherit
    writeHTML('display-block')

  } else {
    let selectValue
    // write to DOM but do not display
    writeHTML('display-none')

    // check for number of catalogs and select only catalog
    if (componentData.Catalogs.length < 2) {
      selectValue = componentData.Catalogs[0].CatalogID
      simSelection(elemId, selectValue)
    } 
    else if(componentData.ComponentTypeName.includes('Curve')) {
      const indexPosition = componentData.Catalogs.findIndex(object=> object.CatalogID === 'N')
      selectValue = componentData.Catalogs[indexPosition].CatalogID
      simSelection(elemId, selectValue)
    }
    else if(componentData.ComponentTypeName.includes('Power Input Position')){
      const indexPosition = componentData.Catalogs.findIndex(object => object.CatalogID === 'E')
      selectValue = componentData.Catalogs[indexPosition].CatalogID
      simSelection(elemId, selectValue)
    }
    else if(componentData.ComponentTypeName.includes('Data Power Location')){
      const indexPosition = componentData.Catalogs.findIndex(object => object.CatalogID === 'I')
      selectValue = componentData.Catalogs[indexPosition].CatalogID
      simSelection(elemId, selectValue)
    }
    else {
      // get length and universes
      const pipeLength = parseInt(JSON.parse($('[name="Length (in)"] + .selection').attr('data-object')).CatalogID)
      const numUniverses = parseInt(JSON.parse($('[name="Universes"] + .selection').attr('data-object')).CatalogID)
      const componentName = componentData.ComponentTypeName
      const totalRuns = () => {
        if (pipeLength <= 512 && numUniverses === 2) {
          return 2
        } else if (pipeLength > 512 && pipeLength <= 1024 && numUniverses === 1) {
          return 2
        } else if (pipeLength > 512 && pipeLength <= 1024 && numUniverses === 2) {
          return 2
        } else if (pipeLength > 1024 && numUniverses === 1) {
          return 3
        } else if (pipeLength > 1024 && numUniverses === 2) {
          return 4
        }
      }

      const numOutlets = (pipeLength / 16) - 1
      
      let selectedRun
      if(componentName.includes('Run 1')) {selectedRun = 1}
      if(componentName.includes('Run 2')) {selectedRun = 2}
      if(componentName.includes('Run 3')) {selectedRun = 3}

      const termOutlet = selectedRun * (Math.ceil(numOutlets / totalRuns()))
      console.log(termOutlet)
      simSelection(elemId, termOutlet)   
    }  
  }
}

/**
 * Function controls flow of UI, call additional functions
 * @param {string} idString 
 */
const next = (idString) => {
  // remove all selections after this one
  $(`#${idString}`).parent().nextAll().remove()
  // record choice from selection
  writeSelection(idString)  
  // get next choice from DB
  getNextChoice(idString)
}

/**
 * Async function to get next choice from DB
 * @param {string} id 
 */
const getNextChoice = async (id) => {
  // console.log(id);
  ChildDecisionNodeID = $(`#${id} option:selected`).attr('data-child')
  // console.log(ChildDecisionNodeID);
  // add next choice row
  await $.get(`/choices/nextChoice/${ChildDecisionNodeID}`, (data) => {
    // console.log(data)
    if(data === null){
      console.log('end of choices')
      $('#submitSpecs').removeClass('display-none')
    } else{
      addChoiceRow(data)
      $('#submitSpecs').addClass('display-none')
      // scroll to bottom of page
      window.scrollTo(0, document.body.scrollHeight)
    }    
  }); 
}

/**
 * Funciton writes selection into html for reference
 * @param {string} id 
 */
const writeSelection = (id) => {
  const selectedOption = $(`#${id} option:selected`).text(); // get text of selected option
  const jsonString = $(`#${id} option:selected`).attr("data-object")
  
  // remove any text which has been previously written to selection
  $(`#${id} ~ .selection`).remove()
  
  
  // set selected text
  $(`#${id}`).after(`
    <div class='selection' data-object='${jsonString}'>
      <p>Selected: <strong>${selectedOption}</strong>
      </p
    </div>
  `)
}

/**
 * Function simulates a user selection on catalog
 * @param {string} id 
 */
const simSelection = (id, value) => {
  // console.log(id, 'sim id')
  // console.log(value, 'sim value');
  $(`#${id}`).val(`${value}`).change();
}


function getDrawing(){
  $('.loader').removeClass('display-none')
  $('#loaderMessage').removeClass('display-none')
  $('#submitSpecs').addClass('display-none')
  const dataObjects = { drawingData:[] }
  $('.selection').each(function() {
    const obj = JSON.parse($(this).attr('data-object'))
    //console.log(obj);
    dataObjects.drawingData.push(obj)    
  }) 
  $.post('/drawing/postDrawing', dataObjects, function(res){    
    //console.log(res)
    window.location.replace(`/drawing/${res}`)
  })
}


//----------------------------- initial choice loaded on page load -----------------------------//
window.onload = async () => { 

  try {
    await $.get("/choices/firstChoice", (data) => {      
      addChoiceRow(data)
    });
  } catch (error) {
    // need to add client output message
    console.log(error)
  }
};
//const pipeDataJson = require('../json/pipePaths.json')
const pipeDrawingOrigin = {'x': 100, 'y': 600}
const  { findStroke, findScale } = require('./measurements')
const bomItems = require('../models/BOMItems')


/**
 * Function to create a matrix string for each g element
 * @param {string} x 
 * @param {string} y 
 * @returns a string
 */
const matrixString = (x, y) => {
  return `matrix(1 0 0 1 ${x} ${y})`
}


/**
 * This function calculates the number of pipes 
 * and outlets needed from total length (in inches) requested.
 * It returns an object with segments by size 
 * and total outlets.
 * @param {object} options 
 * @returns object
 */
function getPipeData(options) {
    const length = parseInt(options.pipeLength)
    const pipes = { 
      '_96': 0, 
      '_48': 0, 
      '_32': 0, 
      '_16': 0,
      'properties': {
        'outlets': 0, 
        'diameter': options.pipeSize
      } 
    }

    if (length % 16 === 0 && length >= 48 && length <= 1200) {
        var units = length / 16
        pipes.properties.outlets = length / 16
        while (units > 0) {
            if (units >= 6) {
                pipes._96 += 1
                units -= 6
            } else if (units >= 3) {
                pipes._48 = 1
                units -= 3
            } else if (units >= 2) {
                pipes._32 = 1
                units -= 2
            } else if (units === 1) {
                pipes._16 = 1
                units = 0
            }
        }
        return pipes
    } else {
        pipes.error = "Length must be divisible by 16, >= to 48, and <= 1200"
        return pipes
    }
}




/**
 * This function returns an array of 3 arrays 
 * @param {*} totalRow 
 * @returns 
 */
function chartRows(totalRow){
  var totalArray = [];
  var chartArrays = []
  for(var i = 0; i < totalRow; i++){
    totalArray.push(i+1)
  } 
  
  chartArrays[0] = totalArray.slice(0, 25)
  chartArrays[1] = totalArray.slice(25, 50)
  chartArrays[2] = totalArray.slice(50, 75)
  
  return chartArrays
}


/**
 * This function creates the pipe elements for the main drawing svg 
 * @param {object} pipeData 
 * @returns an array of elements
 */
// function pipeAssembly(pipeData) {
//   const pipeObjects = []
//   const keys = Object.keys(pipeData)
  
//   let distance = 0
//   // function for constructing G element for each pipe
//   const pipeElement = (matrix, pathData) => {
//     const pipeObject = {
//       'transform': matrix,
//       'paths': pathData,
//       };    
//     return pipeObject
//   };

//   keys.forEach((key) => {    
//     if(pipeData[key] > 0){      
//       const p = `${pipeData.properties.diameter}${key}` // key for pipe selection
//       const pipeWidth = pipeDataJson[p].svgUnits.width  // offset to space pipes horizontally 
      
//       for (let i = 0; i < pipeData[key]; i++) {
//         const pathData = JSON.parse(JSON.stringify(pipeDataJson[p].paths)) // copy of path data
//         pipeObjects.push(pipeElement( matrixString(distance, 0), pathData ))
//         distance = distance + pipeWidth
//       }
//     }
//   })
  
//   return pipeObjects
// }


/**
 * This funciton takes in a set of selections from the user
 * and creates an output object with drawing specifications.
 * @param {object} options
 * @returns an array of elements 
 */
// function sheetOne(options) {
//   let elements = [];
//   let mainTransform;
//   const stroke = findStroke(options.pipeLength)
//   const pipes = getPipeData(options)
  
//   // check for error in pipes
//   if (!pipes.error) {
//     const pipeResults = pipeAssembly(pipes)
//     elements.push(...pipeResults)
//   }
    
//   // set stroke based on pipe length
//   elements.forEach(element => {
//     element.paths.forEach(path => {
//       path.style = path.style.replace('stroke-width:1', `stroke-width:${stroke}`)
//     })  
//   });

//   // set main transform based on pipe size
//   mainTransform = `translate(${pipeDrawingOrigin.x} ${pipeDrawingOrigin.y}) scale(${findScale(options.pipeLength)})`
  
//   return { mainTransform, elements }
// }


 
/**
 * This function filters only the needed BOM components for each drawing
 * @param {array} drawingArray 
 * @returns array
 */
function bomBuilder(drawingArray) {
  return new Promise(async (resolve, reject) => {
    try {
      const getIds = (obj, keyName) => {
        const results = [];
        obj.forEach((entry) => {
          results.push(entry[keyName])
        })
        return results
      }

      const intersection = (arr1, ...arr2) => {
        return arr1.filter(item => arr2.every(arr1 => arr1.includes(item)))
      }

      const productComponentIds = getIds(drawingArray, 'ProductComponentTypeID')
      const catalogIds = getIds(drawingArray, 'CatalogIdentifierID')
      const bomObjects = await bomItems.find()
      const outputObjects = [];

      bomObjects.forEach(entry => {
        const componentTypeIDsLength = entry.ComponentTypeIDs.length;
        const matchingCompIds = intersection(productComponentIds, entry.ComponentTypeIDs)
        
        // match all entrys in componentTypeIds array with productComponentIds array contents
        if (matchingCompIds.length === componentTypeIDsLength) {
          const matchingCatalogIds = intersection(catalogIds, entry.CatalogIDs)
          
          // match as many catalogIds as the entry contains componentTypeIds ... if 3 componentTypeIds, match at least 3 of the catalogIds and so on
          if(matchingCatalogIds.length >= componentTypeIDsLength){
            const indexCheck = outputObjects.findIndex(object => object.partNo === entry.PartNumber)
            // add to result object, if already exists in results increment quantity
            if (indexCheck === -1) {
              outputObjects.push({ // add item number, part number, description, and qty to bom result object
                'partNo': entry.PartNumber,
                'description': entry.Description,
                'qty': entry.Quantity,
                'weight': entry.Weight,
                'orderBy': entry.OrderBy 
              })
              //console.log(`PN: ${entry.PartNumber} W:${entry.Weight} Ord: ${entry.OrderBy}`);
              
            } else {
              outputObjects[indexCheck].qty = outputObjects[indexCheck].qty + entry.Quantity

            }            
          }
        }  
      });

      const sorted = outputObjects.slice().sort(function(a, b){return a.orderBy - b.orderBy})
      // console.log(sorted);
      resolve(sorted)
    } catch (error) {
      reject(error)
    }
  });
}


function partNumberCreator(drawingArray) {
  // sort drawing array by order of apperance for part number
  const drwArry2 = drawingArray.slice().sort(function(a, b){return a.OrderOfAppearance - b.OrderOfAppearance});
  const pnArray = [];
  //create partnumber
  drwArry2.forEach(obj => {
    if (obj.ExcludeFromPartNumber === 'false' && obj.ComponentTypeName !== 'Seperator-3') {
      pnArray.push(obj.CatalogID)
    }  
  });

  return pnArray.join('') 
}


function reqObjBuilder(drawingArray) {
  const partNumber = partNumberCreator(drawingArray)

  const findComponent = (componentName, property) => {
    const result = drawingArray.find( ({ComponentTypeName}) => ComponentTypeName === `${componentName}` )
    
    if (!result) {
      return 'null'
    } else {
      return result[property]
    }
  }

  
  
  return {
    selections: {
      color: findComponent("Color", "CatalogID"),
      dataInput: findComponent("Data Input Type", "CatalogID"),
      dataOutput: findComponent("Data Output Type", "CatalogID"),
      dataPowerLocation: findComponent("Data Power Location", "CatalogID"),
      dmxUniverses: findComponent("Universes", "CatalogID"),
      endCap: findComponent("End Cap Type", "CatalogID"),
      leadWhipLength: findComponent("Lead Length (ft)", "CatalogID"),
      numberOfCircuits: findComponent("Circuits", "CatalogID"),
      numberOfOutlets: findComponent("Outlets", "CatalogID"),
      outletSpacing: findComponent("Outlet Spacing", "CatalogID"),
      partNumber: partNumber,
      pipeLength: findComponent("Length (in)", "CatalogID"),
      pipeSize: findComponent("Pipe Size", "CatalogID"),
      powerInputPosition: findComponent("Power Input Position", "CatalogID"),
      powerInput: findComponent("Power Input Type", "CatalogID"),
      powerOutput: findComponent("Power Output Type", "CatalogID"),
      run1: findComponent("Run 1 Termination Outlet", "CatalogID"),
      run2: findComponent("Run 2 Termination Outlet", "CatalogID"),
      run3: findComponent("Run 3 Termination Outlet", "CatalogID"), 
      run4: findComponent("Run 4 Termination Outlet", "CatalogID"),
    },
    specifications: {
      color: findComponent("Color", "CatalogDescription"),
      pipeSize: findComponent("Pipe Size", "CatalogDescription"),
      pipeLength: findComponent("Length (in)", "CatalogDescription"),
      powerInput: findComponent("Power Input Type", "CatalogDescription"),
      leadLength: findComponent("Lead Length (ft)", "CatalogDescription"),
      dataInput: findComponent("Data Input Type", "CatalogDescription"),
      dataOutput: findComponent("Data Output Type", "CatalogDescription"),
      numOutputs: findComponent("Outlets", "CatalogID"),
      outputSpacing: findComponent("Outlet Spacing", "CatalogID"),
      numCircuits: findComponent("Circuits", "CatalogID"),
    },
  };
  //console.log(partNumber())

}


module.exports = { chartRows, getPipeData, bomBuilder, reqObjBuilder, partNumberCreator };
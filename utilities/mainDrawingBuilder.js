const pipeDataJson = require('../json/pipePaths.json')
const pipeDrawingOrigin = {'x': 0, 'y': 0}

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
 * This function creates the pipe elements for the main drawing svg 
 * @param {object} pipeData 
 * @returns an array of elements
 */
function pipeAssembly(pipeData) {
  const pipeObjects = []
  const keys = Object.keys(pipeData)
  let distance = 0
  // function for constructing G element for each pipe
  const pipeElement = (matrix, pathData) => {
    const pipeObject = {
      'transform': matrix,
      'paths': pathData,
      };    
    return pipeObject
  };

  keys.forEach((key) => {    
    if(pipeData[key] > 0){      
      const p = `${pipeData.properties.diameter}${key}` // key for pipe selection     
      const pipeWidth = pipeDataJson[p].svgUnits.width  // offset to add to space pipes horizontally 
      // console.log(pipeWidth + " " + key)
      for (let i = 0; i < pipeData[key]; i++) {
        pipeObjects.push(pipeElement( matrixString(distance, 0), pipeDataJson[p].paths ))
        distance = distance + pipeWidth
      }
    }
  })
  
  return pipeObjects
}


/**
 * This funciton takes in a set of selections from the user
 * and creates an output object with drawing specifications.
 * @param {object} options
 * @returns an array of elements 
 */
function mainDrawing(options) {
  let elements = [];
  const pipes = getPipeData(options)
  
  // check for error in pipes
  if (!pipes.error) {
    const pipeResults = pipeAssembly(pipes)
    elements.push(...pipeResults)
  }

  return elements
}


module.exports = { mainDrawing };
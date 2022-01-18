const drawingData = require('../models/DrawingData');

// function to collect all unique part numbers
const partNumbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const output = []
      const drawings = await drawingData.find()

      drawings.forEach(dwg => {        
        // check if PN already in array and push to output if not
        if (!output.includes(dwg.partNumber)) {
          output.push(dwg.partNumber)  
        }
      });
      // output full list of unique part numbers
      resolve(output)
      
    } catch (error) {
      reject (error)
    }
  })
}

module.exports = { partNumbers }
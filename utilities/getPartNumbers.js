const drawingData = require('../models/DrawingData');

// function to collect all unique part numbers
const partNumbers = () => {
  return new Promise((resolve, reject) => {
    try {
      const output = []
      drawingData.find({}, function(err, drawings){
        drawings.forEach(dwg => {        
          // check if PN already in array and push to output if not
          if (!output.includes(dwg.partNumber)) {
            output.push({partNumber: dwg.partNumber, drawingId: dwg.id})  
          }
        });
        // output full list of unique part numbers
        resolve(output)
      })
    } catch (error) {
      reject (error)
    }
  })
}

module.exports = { partNumbers }
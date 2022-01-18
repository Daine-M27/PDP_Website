const drawingData = require('../models/DrawingData');


// function to convert array of drawing data into part number
const partNumbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const output = []
      const drawings = await drawingData.find()

      drawings.forEach(dwg => {
        output.push(dwg.partNumber)
      });
      // output full list of unique part numbers
      resolve(output)
      
    } catch (error) {
      reject (error)
    }
  })
  

}




module.exports = { partNumbers }
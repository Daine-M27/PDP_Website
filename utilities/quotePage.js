const drawingData = require('../models/DrawingData');


// function to convert array of drawing data into part number
const partNumbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const output = []
      const drawings = await drawingData.find()

      drawings.forEach(drwArray => {
        const pnArray = [];
        // sort drawing array by order of apperance for part number
        const drwArray2 = drwArray.drawingData.slice().sort(function(a, b){return a.OrderOfAppearance - b.OrderOfAppearance});
        
        //create partnumber
        drwArray2.forEach(obj => {
          if (obj.ExcludeFromPartNumber !== 'true' && obj.ComponentTypeName !== 'Seperator-3') {
            pnArray.push(obj.CatalogID)
          }  
        });

        const pn = pnArray.join('')
        
        // check if PN already in array and push to output if not
        if (!output.includes(pn)) {
          output.push(pn)  
        }
      });

      resolve(output)
      
    } catch (error) {
      reject (error)
    }
  })
  

}




module.exports = { partNumbers }
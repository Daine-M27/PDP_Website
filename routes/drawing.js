const { getPipeData, chartRows, bomBuilder, reqObjBuilder, partNumberCreator } = require('../utilities/sheetBuilder');
const express = require('express');
const drawingData = require('../models/DrawingData');
const router = express.Router();

/**
 * Sheet class object 
 */
class Sheet {
  constructor( partOptions, sheetNumber ) {
      Object.assign(this, partOptions)
      this.sheetNumber = sheetNumber;
      this.date = new Date().toLocaleDateString();
      this.drawnBy = 'DM';
      this.bomItems = [];
      this.specifications = {};
      this.outletPositions = [];
      this.customLabels = [];
      this.foldSheetData = {};
      this.weight = ''
    }
}

/**
 * 
 * @param {String} length 
 * @returns returns number of sheets IE.. folded sheet or not
 */
const maxSheet = (length) => {
  if (parseInt(length) > 96) {
    return '5'
  }
  else {
    return '4'
  }
}

/**
 * 
 * @param {Object} bom 
 * @returns calculated weight of all bom items
 */
const getWeight = (bom) => {
  let output = 0;

  bom.forEach(ele => {
    if (ele.weight !== null) {
      output = output + ele.weight * ele.qty
    }
  });

  return output.toFixed(2)
}

/* GET drawing page. */
router.get('/:drawingId', function(req, res) {
  // console.log(req.params.drawingId, 'drawing page')
  console.log('building drawing');
  try {
    drawingData.findById(req.params.drawingId, function(err, drawing) {
      const reqObject = reqObjBuilder(drawing.drawingData);
      bomBuilder(drawing.drawingData).then((bomObject) => {
        // get number of sheets
        const numSheets = maxSheet(reqObject.selections.pipeLength)
        
        // setup sheet1  
        const sheet1 = new Sheet(reqObject.selections, `SHEET 1 OF ${numSheets}`) 
        sheet1.bomItems = [...bomObject] 
        sheet1.specifications = JSON.parse(JSON.stringify(reqObject.specifications))
        sheet1.weight = getWeight(bomObject) 
    
        // setup sheet2
        const sheet2 = new Sheet(reqObject.selections, `SHEET 2 OF ${numSheets}`)
    
        // setup sheet3
        const sheet3 = new Sheet(reqObject.selections, `SHEET 3 OF ${numSheets}`)
    
        // setup sheet4
        const sheet4 = new Sheet(reqObject.selections, `SHEET 4 OF ${numSheets}`)
        sheet4.outletPositions = [...chartRows(sheet4.numberOfOutlets)]
        // sheet4.customLabels = [...tempCustomLabelObject]
        
        // setup sheet5
        if (parseInt(reqObject.selections.pipeLength) > 96) {
          const sheet5 = new Sheet(reqObject.selections, 'SHEET 5 OF 5')
          sheet5.foldSheetData = getPipeData(sheet5)
          sheet5.weight = getWeight(bomObject)
          res.render('drawing', { pageTitle: 'Drawing Page', sheets: { sheet1, sheet2, sheet3, sheet4, sheet5 } });
        }
        else {
          res.render('drawing', { pageTitle: 'Drawing Page', sheets: { sheet1, sheet2, sheet3, sheet4 } });
        } 
      });  
    })  
  } catch (error) {
    console.log(error)
    res.render('error', { pageTitle: 'Something went wrong.', subTitle: 'Please contact The Light Source.' })
  }   
});

/* Post drawing */
router.post('/postDrawing', function(req, res) { 
 console.log('postDrawing'); 
  try {
    drawingData.create({partNumber: partNumberCreator(req.body.drawingData), drawingData:req.body.drawingData }, function(error, response) {
      if(error) {
        throw error;
      } else {
        res.status(200).end(`${response._id}`)
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).end(`Error: ${error}`)
  }
});



module.exports = router;


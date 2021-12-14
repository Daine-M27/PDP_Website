const { getPipeData, chartRows, bomBuilder, reqObjBuilder } = require('../utilities/sheetBuilder');
const { tempReqObject, tempSpecificationsObject, tempBomObject, tempCustomLabelObject } = require('../utilities/tempObjects');
const express = require('express');
const drawingData = require('../models/DrawingData');
const router = express.Router();

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

const maxSheet = (length) => {
  if (parseInt(length) > 96) {
    return '5'
  }
  else {
    return '4'
  }
}

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
router.get('/:drawingId', async function(req, res) {
  // console.log(req.params.drawingId, 'drawing page')
  try {
    const drawing = await drawingData.findById(req.params.drawingId).exec();
    const reqObject = await reqObjBuilder(drawing.drawingData);
    const bomObject = await bomBuilder(drawing.drawingData);

    // get number of sheets
    const numSheets = maxSheet(tempReqObject.pipeLength)
    
    // setup sheet1  
    const sheet1 = new Sheet(reqObject.selections, `SHEET 1 OF ${numSheets}`) 
    sheet1.bomItems = [...bomObject] 
    sheet1.specifications = JSON.parse(JSON.stringify(reqObject.specifications)) 

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
    else{
      res.render('drawing', { pageTitle: 'Drawing Page', sheets: { sheet1, sheet2, sheet3, sheet4 } });
    } 
    
  } catch (error) {
    res.render('error', { pageTitle: 'Something went wrong.', subTitle: 'Please contact The Light Source.' })
  }   
});


router.post('/postDrawing', async function(req, res) {
  // console.log(req.body);
  try {
    await drawingData.create(req.body)
      .then((response) => {
        // console.log(response._id)
        // res.redirect(`/drawing/${response._id}`)
        res.status(200).end(`${response._id}`)
      })
    
  } catch (error) {
    console.log(error);
    res.status(500).end(`Error: ${error}`)
  }
});

module.exports = router;


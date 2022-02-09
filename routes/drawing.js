const express = require('express');
const router = express.Router();
const Agenda = require('agenda');
const { getPipeData, chartRows, bomBuilder, reqObjBuilder, partNumberCreator } = require('../utilities/sheetBuilder');
const drawingData = require('../models/DrawingData');
const pug = require('pug')
const path = require('path')
const filePath = path.join(__dirname, '../views')

const jobQueue = new Agenda({
  db: {
    address: process.env.DB_URI,
    collection: 'drawingJobs',
  },
});

jobQueue.start();

jobQueue.define('makeDrawing', (job, done) => {
  buildHtml(job.attrs.data, () => {
    console.log('drawing created')
    done()
  })
})


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

async function buildHtml(dwg_id) {
  //console.log(dwg_id, 'sheet builder')
  try {
    const drawing = await drawingData.findById(dwg_id).exec();
    const reqObject = reqObjBuilder(drawing.DrawingData);
    const bomObject = await bomBuilder(drawing.DrawingData);

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
    // console.log(sheet4);
    sheet4.outletPositions = [...chartRows(sheet4.numberOfOutlets)]
    // sheet4.customLabels = [...tempCustomLabelObject]
    
    // setup sheet5
    if (parseInt(reqObject.selections.pipeLength) > 96) {
      const sheet5 = new Sheet(reqObject.selections, 'SHEET 5 OF 5')
      sheet5.foldSheetData = getPipeData(sheet5)
      sheet5.weight = getWeight(bomObject)
      const html = pug.renderFile(`${filePath}/drawing.pug`, { pageTitle: 'Drawing Page', sheets: { sheet1, sheet2, sheet3, sheet4, sheet5 } });
    
      await drawingData.findOneAndUpdate({_id: `${drawing._id.toString()}`}, {Html: html, HtmlStatus: true})
      
    }
    else {
      const html = pug.renderFile(`${filePath}/drawing.pug`, { pageTitle: 'Drawing Page', sheets: { sheet1, sheet2, sheet3, sheet4 } });
      
      await drawingData.findOneAndUpdate({_id: `${drawing._id.toString()}`}, {Html: html, HtmlStatus: true})
      
    } 
    
  } catch (error) {
    console.log(error)
  }
}

/* GET drawing page. */
router.get('/:drawingId', async function(req, res) {
  //console.log(req.params.drawingId);
  res.render('drawingLoader', { pageTitle: 'Drawing Page', dwgId: req.params.drawingId })
  
});

router.get('/loader/:drawingId', async function(req, res) {
  try {
    const drawing = await drawingData.findById(req.params.drawingId).exec();
    
    if (drawing.HtmlStatus != true) {
      res.send(drawing.HtmlStatus)
    } else {
      res.send(drawing.Html)
    }
  } catch (error) {
    console.log(error);
  }
})

/* Post drawing */
router.post('/postDrawing', function(req, res) { 
  try {
    drawingData.create(
      {
        PartNumber: partNumberCreator(req.body.drawingData), 
        DrawingData:req.body.drawingData,
        HtmlStatus: false
      }
      )
      .then((response) => {
        // buildHtml(response._id)
        jobQueue.now('makeDrawing', response._id)
        res.status(200).end(`${response._id}`)
      })
    
  } catch (error) {
    console.log(error);
    res.status(500).end(`Error: ${error}`)
  }
});



module.exports = router;


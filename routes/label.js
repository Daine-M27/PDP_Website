const express = require('express');
const router = express.Router();
const pug = require('pug');
const path = require('path');
const { partNumbers } = require('../utilities/getPartNumbers');
const drawingData = require('../models/DrawingData');
const customLabels = require('../models/CustomLabels')
const filePath = path.join(__dirname, '../views')


/* GET custom label page. */
router.get('/', async function(req, res) {
  const partNumbersList = await partNumbers()
  res.render('label', { pageTitle: 'MEGABATTEN Custom Labels', partNumbersList})
});



router.get('/inputs/:pn', async function(req, res) {
  const partNum = decodeURIComponent(req.params.pn)
  const dwgData = await drawingData.findOne({partNumber: partNum})

  const findComponent = (componentName, property, objArray) => {
    const result = objArray.find( ({ComponentTypeName}) => ComponentTypeName === `${componentName}` )    
    if (!result) {
      return 'null'
    } else {
      return result[property]
    }
  }  
  
  const options = {
    partNumber: partNum,
    outlets: findComponent('Outlets', 'CatalogID', dwgData.drawingData),
    circuits: findComponent('Circuits', 'CatalogID', dwgData.drawingData),
    run1: findComponent("Run 1 Termination Outlet", "CatalogID", dwgData.drawingData),
    run2: findComponent("Run 2 Termination Outlet", "CatalogID", dwgData.drawingData),
    run3: findComponent("Run 3 Termination Outlet", "CatalogID", dwgData.drawingData), 
    run4: findComponent("Run 4 Termination Outlet", "CatalogID", dwgData.drawingData)
  }
  
  const html = pug.renderFile(`${filePath}/labelSheet.pug`, {options})

  res.send(html)
})

router.post('/printSheet', async function(req, res) {
  // console.log(req.body);
  const {
    numOutlets,
    numCircuits,
    company,
    building,
    projectName,
    location,
    partNumber,
    customCircuitInput,
    customLabelInput,
  } = req.body;
  
  try {
    await customLabels.create({
      NumOutlets:numOutlets,
      NumCircuits:numCircuits,
      Company:company,
      Building: building,
      ProjectName: projectName,
      Location: location,
      PartNumber: partNumber,
      CustomCircuitInput: customCircuitInput,
      CustomLabelInput: customLabelInput
    })
    .then((response) => {
      const html = pug.renderFile(`${filePath}/labelPrintSheet.pug`, {
        pageTitle: "Custom Label Sheet",
        numOutlets,
        numCircuits,
        company,
        building,
        projectName,
        location,
        partNumber,
        customCircuitInput,
        customLabelInput,
      });
      res.send(html)
      
    })
  } catch (error) {
    console.log(error);
    res.render('error', { pageTitle: 'Something went wrong.', subTitle: 'Please contact The Light Source.' })
  }

})

module.exports = router;

// {
//   company: 'Some Company',
//   building: 'Some Building',
//   'project-name': 'Church Auditorium',
//   location: 'Some Location',
//   partNumber: 'PDP1.5B96-1LE12I1X6-EX16R',
//   'custom-circuit-input': [ '1', '1', '1', '1', '1', '1' ],
//   'custom-label-input': [
//     '12345678',
//     '12345678',
//     '12345678',
//     '12345678',
//     '12345678',
//     '12345678'
//   ]
// }
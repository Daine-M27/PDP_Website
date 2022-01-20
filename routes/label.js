const express = require('express');
const router = express.Router();
const pug = require('pug');
const path = require('path');
const { partNumbers } = require('../utilities/getPartNumbers');
const drawingData = require('../models/DrawingData');


/* GET custom label page. */
router.get('/', async function(req, res) {
  const partNumbersList = await partNumbers()
  res.render('label', { pageTitle: 'MEGABATTEN Custom Labels', partNumbersList})
});



router.get('/inputs/:pn', async function(req, res) {
  const filePath = path.join(__dirname, '../views')
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
module.exports = router;
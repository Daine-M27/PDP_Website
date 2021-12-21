const express = require('express');
const router = express.Router();
const { partNumbers } = require('../utilities/quotePage');


// get quote page
router.get('/', function(req, res){
  res.render('quote', { pageTitle: 'MEGABATTEN Quote'})
})

// get partNumber list
router.get('/partNumberList', async function(req, res){
  const partNumbersList = await partNumbers()
  res.send(partNumbersList)
})

module.exports = router;
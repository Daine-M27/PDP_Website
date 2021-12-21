const express = require('express');
const router = express.Router();
const { partNumbers } = require('../utilities/quotePage');


// get quote page
router.get('/', async function(req, res){
  const partNumbersList = await partNumbers()
  res.render('quote', { pageTitle: 'MEGABATTEN Quote', partNumbersList})
})

// get partNumber list
// router.get('/partNumberList', async function(req, res){
//   res.send(partNumbersList)
// })

module.exports = router;
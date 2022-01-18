var express = require('express');
var router = express.Router();
const { partNumbers } = require('../utilities/getPartNumbers');

/* GET custom label page. */
router.get('/', async function(req, res, next) {
  const partNumbersList = await partNumbers()
  res.render('label', { pageTitle: 'MEGABATTEN Custom Labels', partNumbersList})
});

module.exports = router;
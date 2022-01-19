const express = require('express');
const router = express.Router();
const pug = require('pug');
const { partNumbers } = require('../utilities/getPartNumbers');

/* GET custom label page. */
router.get('/', async function(req, res) {
  const partNumbersList = await partNumbers()
  res.render('label', { pageTitle: 'MEGABATTEN Custom Labels', partNumbersList})
});



router.get('/inputs', async function(req, res) {
  const html = pug.renderFile('../views/labelSheet', {body:req.body})

  res.send(html)
})
module.exports = router;
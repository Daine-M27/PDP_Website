const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  res.redirect('/configurator')
});

/* GET configurator page. */
router.get('/configurator', function(req, res) {
  res.render('configurator', { pageTitle: 'MEGABATTEN Configurator' });
});




module.exports = router;
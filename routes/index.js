const express = require('express');
const router = express.Router();

/* GET configurator page. */
router.get('/', function(req, res, next) {
  res.redirect('/configurator')
});

router.get('/configurator', function(req, res, next) {
  res.render('configurator', { pageTitle: 'MEGABATTEN Configurator' });
});

module.exports = router;

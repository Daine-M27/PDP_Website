const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  res.redirect('/configurator')
});

/* GET configurator page. */
router.get('/configurator', function(req, res) {
  res.render('configurator', { pageTitle: 'MEGABATTEN Configurator' });
});


router.get('/quote', function(req, res){
  res.render('quote', { pageTitle: 'MEGABATTEN Quote'})
})

module.exports = router;
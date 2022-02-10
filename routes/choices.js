const express = require('express');
const router = express.Router();
const choices = require('../models/ProductComponentOptions')


/* GET first choice */
router.get('/firstChoice', function(req, res) {
  try {
    choices.findOne({ ComponentTypeName: 'Series' }, function (err, docs) {
      if(err){
        throw err;
      } else {
        res.json(docs)
      }      
    })
  } catch (error) {
    res.status(400).send('Error getting first choice')
  }
});

/* GET next choice */
router.get('/nextChoice/:ChildDecisionNodeID', function(req, res) {
  try {
    choices.findOne({ ParentDecisionNodeID: req.params.ChildDecisionNodeID }, function (err, docs) {
      if(err){
        throw err;
      } else {
        res.json(docs)
      }
    })
  } catch (error) {
    res.status(400).send('Error getting next choice')
  }
});




module.exports = router;

const express = require('express');
const router = express.Router();
const choices = require('../models/ProductComponentOptions')


/* GET first choice listing. */
router.get('/firstChoice', async function(req, res) {
  try {
    const firstChoice = await choices.findOne({ ComponentTypeName: 'Series'}).exec()
    res.json(firstChoice)
  } catch (error) {
    res.status(400).send('Error getting first choice')
  }
});

/* GET next choice listing. */
router.get('/nextChoice/:ChildDecisionNodeID', async function(req, res) {
  console.log(req.params)
  try {
    const nextChoice = await choices.findOne({ ParentDecisionNodeID: req.params.ChildDecisionNodeID}).exec()
    res.json(nextChoice)
  } catch (error) {
    res.status(400).send('Error getting next choice')
  }
});




module.exports = router;

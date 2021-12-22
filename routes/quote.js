const express = require('express');
const router = express.Router();
const { partNumbers } = require('../utilities/quotePage');
const quoteRequest = require('../models/QuoteRequests')


// get quote page
router.get('/', async function(req, res){
  const partNumbersList = await partNumbers()
  res.render('quote', { pageTitle: 'MEGABATTEN Quote', partNumbersList})
})


router.post('/', async function(req, res){
  try {
    const data = req.body
    const itemsObject = Object.fromEntries(Object.entries(data).filter(([key]) => key.includes('item')))
    const quoteItems = []
    
    for (let i = 1; i <= Object.keys(itemsObject).length / 2; i++) {
      quoteItems.push({'PartNumber': itemsObject[`item-${i}-pn`], 'Quantity': itemsObject[`item-${i}-qty`]})  
    }
    
    const qr = new quoteRequest({
      ProjectName: data['project-name'],
      ProjectAddress: data['project-address'],
      CustomerName: data['customer-name'],
      CustomerAddress: data['customer-address'],
      CustomerEmail: data['customer-email'],
      ContactEmail: data['contact-email'],
      ContactPhoneNumber: data['contact-phone'],
      IsBidJob: data['bid-job'],
      QuoteItems: quoteItems,
      DateCreated: new Date()
    })
  
    await qr.save(function (err) {
      if(err) return err
      res.send(`'quoteId: ${qr._id}'`)
    })
    
    console.log(qr);
    

  } catch (error) {
    
  }

})


module.exports = router;

// {
//   'project-name': 'Church Auditorium',
//   'project-address': '1807 Hoosac Drive',
//   'customer-name': 'Daine Marshall',
//   'customer-company': 'SomePlaceInc',
//   'customer-address': '1807 Hoosac Drive',
//   'contact-email': 'dainemarshall@gmail.com',
//   'contact-phone': '7049808427',
//   'bid-job': 'yes',
//   'batten-Input': '',
//   'batten-Qty': '1',
//   'item-1': 'PDP1.5B400-3SE0I2J25-EJ16R1225',
//   'item-1-Qty': '4',
//   'item-2': 'PDP1.5WM592-4CE0I2J37-EJ16R1837',
//   'item-2-Qty': '5',
//   'item-3': 'PDP1.5BG288-1CE0I1J18-EJ16R18',
//   'item-3-Qty': '20'
// }
const express = require('express');
const router = express.Router();
const { partNumbers } = require('../utilities/quotePage');
const quoteRequest = require('../models/QuoteRequests')
const mail = require('../utilities/email')



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
    
    for (let i = 1; i <= Object.keys(itemsObject).length / 3; i++) {
      quoteItems.push({'PartNumber': itemsObject[`item-${i}-pn`],'CustomLabeling': itemsObject[`item-${i}-cl`], 'Quantity': itemsObject[`item-${i}-qty`]})  
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
      
    })
    
    async function sendMail(){
      await mail({
        subject:'Quote Request from MEGABATTEN.com', 
        text:  `
        Project Name = ${qr.ProjectName},
        Project Address = ${qr.ProjectAddress},
        Customer Name = ${qr.CustomerName},
        Customer Email = ${qr.CustomerEmail},
        Customer Address = ${qr.CustomerAddress},
        Contact Email = ${qr.ContactEmail},
        Contact Phone Number = ${qr.ContactPhoneNumber},
        Bid Job = ${qr.IsBidJob},
        Quote Items = ${qr.QuoteItems},
        Date Requested = ${qr.DateCreated},
        RFQ Number = ${qr._id}
        `
      })
    }

    sendMail()
    .then(() => {
      console.log(qr);
      // res.send(`'quoteId: ${qr._id}'`)
      res.render('success', { pageTitle:'Success', message: 'Your request for quote has been recieved.'})
    })
    .catch(err => {
      console.log(err)
    })
    

  } catch (error) {
    console.log(error)
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
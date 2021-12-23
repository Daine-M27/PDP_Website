const nodemailer = require('nodemailer');
require('dotenv').config({path: '.env'});

// if(dotenv.error){
//     console.log(dotenv.error)
// }
// console.log("env data :" + dotenv.parsed);

/**
 * 
 * @param {object} data
 * {
 * emailAddress: "email@address",
 * subject: "subject text",
 * text: "body text"
 * } 
 */
function sendEMail (data){
  // console.log(process.env.EMAIL_USER_NAME, process.env.EMAIL_PASSWORD);
    return new Promise((resolve,reject) => {
       const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: '587',
          auth: {
              user: process.env.EMAIL_USER_NAME,
              pass: process.env.EMAIL_PASSWORD
          },
          secureConnection: true,
          tls: { ciphers: 'SSLv3' }
       });

       const mailOptions = {
           from: process.env.EMAIL_USER_NAME,
           to: process.env.EMAIL_SEND_TO,
           subject: data.subject,
           text: data.text
       };

       //console.log("mailOptions :" + process.env.USER_NAME)
       transporter.sendMail(mailOptions, (err, info) => {
           if(err){
               reject(err);
               //console.log(err)
           } else {
                resolve();   
            //console.log("Email send :" + info.respose)
           }
       })
    })
    
}

module.exports = sendEMail
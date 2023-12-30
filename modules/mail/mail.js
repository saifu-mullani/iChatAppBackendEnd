const nodemailer = require('nodemailer');


// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'MyChatAppEmailService@gmail.com',
    pass: 'dguo adnw hiwb pnvg'
  }
});



// Read the HTML template file






const sendMail = (mailOptions)=>{
   return new Promise((resolve, reject) => {
      mailOptions.from = 'MyChatAppEmailService@gmail.com'
      // Send email
      transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return reject({
          status:"fail",
          statusCode:400,
          result:[],
          error : error
        })
      } else {
        console.log('Email sent: ' + info.response);
        return resolve({
          status:"success",
          statusCode:200,
          result:'Email sent: ' + info.response,
          error : ""
        })
      }
    })
  });
}

module.exports = sendMail
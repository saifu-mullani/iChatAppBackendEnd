const sendMail = require("./mail")
const fs = require('fs');

const templatePath = './modules/mail/emailTemplates/user-registered-email-template.html';
const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

// Replace placeholders with actual data
const replacedTemplate = htmlTemplate.replace('{{name}}', 'Naveen Goyal').replace('{{user_id}}', 'naveen_goyal');

// Email content
const mailOptions = {
  to: 'navgoyal@cisco.com',
  subject: 'User Registration Successfull',
  html: replacedTemplate
};

const callMe = async()=>{
    try {
        let resp = await sendMail(mailOptions)
        console.log("resp",resp)
        
    } catch (error) {
        console.log(error)
    }
}
callMe()
'use strict';
const nodemailer = require('nodemailer');

async function sendEmail(data) {
   let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dummyShubham0994@gmail.com',
            pass: 'Dummy@12345'
        }
    });

    var mailOptions = {
        from: 'noreply@meetingnotifier.com',
        to: data.user.email,
        subject: 'New Meeting Shcedule',
        html: data.html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports={
    sendEmail:sendEmail
}

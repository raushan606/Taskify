const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'kumarishivanisingh14@gmail.com',
    from: 'raushankumar606@gmail.com',
    subject: 'This is my first creation',
    text: 'I hope this one actually get to you'
})


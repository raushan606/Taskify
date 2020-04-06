const sgMail = require("@sendgrid/mail");

const sendgridAPIKey =
  

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "raushankumar606@gmail.com",
    subject: "Thanks for Joining In!",
    text: `Welcome to the App, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "raushankumar606@gmail.com",
    subject: "Sorry to see you Go",
    text: `GoodBye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};

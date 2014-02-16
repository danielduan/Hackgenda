var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD);

exports.sendEmailCard = function(email, subject, message){

  sendgrid.send({
    to: email,
    from: 'hack@hackgenda.herokuapp.com',
    subject: subject,
    text: message
  }, function(err, json) {
  if (err) { return console.error(err); }
    console.log(json);
  });
};
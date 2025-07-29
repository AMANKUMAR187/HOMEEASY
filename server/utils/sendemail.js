import nodeMailer from "nodemailer";

export  const sendEmail = async ({email,subject,message}) => {
    const transport  = nodeMailer.createTransport({
       // host:'smtp.gmail.com',
       host : process.env.SMTP_HOST,
        service : process.env.SMTP_SERVICE,
        port : process.env.SMTP_PORT,
        auth : {
            user:process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
     const options = {
        from :process.env.SMTP_MAIL,
        to :email,
        subject,
        html : message,
     };
     transport.sendMail(options, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    

     

 
};


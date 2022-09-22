const mailConfig = {
    fromName:"Food Florist Helsingborg",
    fromMail:"foodfloristhbg@gmail.com",
    service: 'gmail',
    auth:{
        user: "foodfloristhbg@gmail.com",
        pass: process.env.GMAIL_PASS,
    }
}

module.exports = mailConfig
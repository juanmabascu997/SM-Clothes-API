const Mailjet = require('node-mailjet');
const {emailMesagge} = require('../data/EmailData')
const {emailMesaggeAllMovements} = require('../data/EmailDataAll')


const SendEmail = async (req, accion, sentAll = false) => {
    const mailjet = new Mailjet({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });

    let request = null

    if(sentAll) {
      request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: await emailMesaggeAllMovements(req)
      })
    } else {
      request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages:emailMesagge(req, accion)
      })
    }

    request
      .then((result) => {
        console.log('Correo enviado exitosamente ', result.response.statusText)
      })
      .catch((err) => {
        console.log(err.ErrorMessage)
      })
}


module.exports = {
    SendEmail
}
const Mailjet = require('node-mailjet');
const {emailMesagge} = require('../data/EmailData')
const {emailMesaggeAllMovements} = require('../data/EmailDataAll')


const SendEmail = async (req, accion, sentAll = false) => {
    const mailjet = new Mailjet({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });

    const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: sentAll === false ? emailMesagge(req, accion) : emailMesaggeAllMovements(req, accion)
    })

    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.ErrorMessage)
      })
}


module.exports = {
    SendEmail
}
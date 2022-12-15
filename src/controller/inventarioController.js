const Mailjet = require('node-mailjet');
const {emailDataInventario} = require('../data/EmailDataInventario')

const SendEmail = async (req) => {
    const mailjet = new Mailjet({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET
    });

    request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
    Messages: await emailDataInventario(req)
    })

    request
      .then((result) => {
        console.log('Correo enviado exitosamente')
      })
      .catch((err) => {
        console.log(err.ErrorMessage)
      })
}

const sendInventario = async (req, res) => {
    try {
        let response = await SendEmail(req.body.thisBody)
        res.send(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    sendInventario
}
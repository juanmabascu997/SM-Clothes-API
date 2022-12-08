const Mailjet = require('node-mailjet');



const SendEmail = async (req) => {
    const mailjet = new Mailjet({
      apiKey:'3b511d6cac017aac652b25b17fb6360e',
      apiSecret:'03e4d4ed563823933f6b4eb1f0d6b60a'
    });

    const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "jmb972012@gmail.com",
            Name: "Juan Manuel"
          },
          To: [
            {
              Email: "jmb972012@gmail.com",
              Name: "SM Clothes"
            }
          ],
          Subject: `Tienes movimientos de cuenta`,
          TextPart: `Hola! Estos serian los movimientos de stock que acabamos de registrar a nombre de${req[0].editor_name}`,
          HTMLPart: `<h3>Hola! Estos serian los movimientos de stock que acabamos de registrar a nombre de ${req[0].editor_name}</h3><br />
                    ${req.map(
                      e => {return `<div><p> ${e.description} + ${e.stock_modificate}</p><br /></div>`}
                    )} 
                    <h2>A continuacion generamos el adjunto de lo realizado</h2>
                    `
        }
      ]
    })

    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
}


module.exports = {
    SendEmail
}
const Mailjet = require('node-mailjet');



const SendEmail = async (req, accion) => {
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
          HTMLPart: `<h3><strong>Hola!</strong></h3><p>Estos serian los movimientos de stock que acabamos de registrar a nombre de ${req[0].editor_name}</p><br />
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th style="text-align: center;">Stock ${accion === "Sumar" ? "añadido" : "sustraido"}</th>
              </tr>
            </thead>
            <tbody>
              ${req.map(e => {
                return `<div>
                        <tr>
                          <td>${e.description}</td>
                          <td style="text-align: center;">${e.stock_modificate}</td>
                        </tr></div>\\n`})}
            </tbody>
          </table>
          <h3>A continuacion generamos el adjunto de lo realizado</h3>
          <a href="https://smclothes.com.ar/">Politicas de privacidad</a>
          `,
          Attachments: [
            {
              ContentType: "text/plain",
              Filename: "test.txt",
              Base64Content: "VGhpcyBpcyB5b3VyIGF0dGFjaGVkIGZpbGUhISEK"
            }
          ]
        }
      ]
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
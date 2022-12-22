function emailMesagge(req, accion) {
    return [
        {
          From: {
            Email: process.env.EMAIL_TO,
            Name: "SM Clothes App"
          },
          To: [
            {
              Email: process.env.EMAIL_TO,
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
                        </tr></div>`})}
            </tbody>
          </table>
          <a href="https://smclothes.com.ar/">Politicas de privacidad</a>
          `,
        }
      ]
} 

module.exports = {
    emailMesagge
}
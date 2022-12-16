function emailMesagge(req, accion) {
    console.log(accion);

    return [
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
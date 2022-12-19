// Import dependencies
const fs = require("fs");
const XLSX = require("xlsx");

async function writer(req) {
  // Create a new XLSX file
  let sheet = JSON.stringify(req)
  let again = JSON.parse(sheet)
  const newBook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(again);

  XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
  try {
    XLSX.writeFile(newBook,'inventory-book.xlsx');
    let binaryData = fs.readFileSync('inventory-book.xlsx')
    let base64string = new Buffer.from(binaryData).toString("base64")
    return base64string
  } catch(error){
    console.log(error.ErrorMessage)
  }
}

async function emailDataInventario(req) {
  let base = await writer(req)
  return [
    {
      From: {
        Email: process.env.EMAIL_FROM,
        Name: "Juan Manuel"
      },
      To: [
        {
          Email: process.env.EMAIL_TO,
          Name: "SM Clothes"
        }
      ],
        Subject: `Inventario`,
        TextPart: `Hola! Adjuntamos el Inventario realizado.`,
        HTMLPart: `<h3><strong>Hola!</strong></h3><p>Adjuntamos el Inventario realizado.</p><br />
        <a href="https://smclothes.com.ar/">Politicas de privacidad</a>
        `,
        Attachments: [
          {
            ContentType: "text/plain",
            Filename: "inventario.xlsx",
            Base64Content: `${base}`
          }
        ]
      }
    ]
}


module.exports = {
    emailDataInventario
}
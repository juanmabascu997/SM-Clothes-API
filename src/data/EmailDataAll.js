// Import dependencies
const fs = require("fs");
const XLSX = require("xlsx");  
const { uploadFile } = require('../config/createFile')
const path = require('path');

async function writer(req) {
  // Create a new XLSX file
  let sheet = JSON.stringify(req)
  let again = JSON.parse(sheet)
  const newBook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(again);

  XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
  try {
    XLSX.writeFile(newBook,'new-book.xlsx');
    // const filePath = path.join(__dirname, '../../new-book.xlsx');
    // await uploadFile(filePath,'todos-los-movimientos')
    let binaryData = fs.readFileSync('new-book.xlsx')
    let base64string = new Buffer.from(binaryData).toString("base64")
    return base64string
  } catch(error){
    console.log(error.ErrorMessage)
  }
}

async function emailMesaggeAllMovements(req) {
  let base = await writer(req)
  return [
    {
      From: {
        Email: process.env.EMAIL_FROM,
        Name: "SM Clothes API"
      },
      To: [
        {
          Email: process.env.EMAIL_TO,
          Name: "SM Clothes"
        }
      ],
        Subject: `Resumen de movimientos`,
        TextPart: `Hola! Estos serian todos los movimientos registrados.`,
        HTMLPart: `<h3><strong>Hola!</strong></h3><p>Te enviamos adjunto el archivo con todos los movimientos registrados hasta el momento.</p><br />
        <a href="https://smclothes.com.ar/">Politicas de privacidad</a>
        `,
        Attachments: [
          {
            ContentType: "text/plain",
            Filename: "movimientos.xlsx",
            Base64Content: `${base}`
          }
        ]
      }
    ]
}


module.exports = {
    emailMesaggeAllMovements
}
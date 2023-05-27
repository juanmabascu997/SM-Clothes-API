const { default: axios } = require("axios");
var qs = require("qs");
const { GoogleSpreadsheet } = require("google-spreadsheet");

let initiGoogleSheets = async () => {
  try {
    const doc = new GoogleSpreadsheet(
      "1--4v732Q_EDgE4dAaynXcgFCIT_msZuoF_UFvElMBgY"
    );
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
        "\n"
      ),
    });
    await doc.updateProperties({ title: "Productos en Stock" });
    return doc;
  } catch (err) {
    console.log(err)
    return false;
  }
};

var data = qs.stringify({
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.PASSWORD,
});

var config = {
  method: "post",
  url: "https://rest.contabilium.com/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: data,
};

var token = ''

const getProductosAndToken = async (tk) => {
    try {
        var getStockProducts = {
          method: "get",
          url: "https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277&page=1",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${tk ? tk : token}`,
          },
        };
        console.log(tk);
        let primeraproducts = await axios(getStockProducts);
        return primeraproducts
    } catch (err) {
        if(err.response.status === 401) {
            let newToken = await axios(config)
            let nuevoToken = await getProductosAndToken(newToken.data.access_token);
            return nuevoToken
        } else {
            return false;
        }
    }
};

const getProducts = async (req, res) => {
  try {
    const doc = await initiGoogleSheets();
    const sheet = await doc.sheetsByIndex[0];
    await sheet.clearRows()

    let newtoken = await axios(config)
    token = newtoken.data.access_token

    let primeraproducts = await getProductosAndToken(token)
    if (doc) {
            for (
              let i = 1;
              i <=
              Math.ceil(
                primeraproducts.data.TotalItems / primeraproducts.data.TotalPage
              );
              i++
            ) {
                var getStockProducts = {
                    method: "get",
                    url:
                    "https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277" +
                    "&page=" +
                    i,
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:  `Bearer ${token}`,
                    },
                };
                const products = await axios(getStockProducts);
                let arregloPorFila = products.data.Items.map((e) => {
                    return {
                        'Id': e.Id,
                        'Codigo': e.Codigo,
                        "Stock Actual": e.StockActual,
                        "Stock con Reservas": e.StockConReservas,
                    }
                    });
                await sheet.addRows(arregloPorFila);
            }
            res.status(200).json({ message: "Sucess" });
    } else {
      res.status(200).json({ message: "Error en doc sheets" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
};

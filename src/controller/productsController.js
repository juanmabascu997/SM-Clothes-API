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

const getProductosAndToken = async (token) => {
    try {
        var getStockProducts = {
          method: "get",
          url: "https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277&page=1",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        };
        let primeraproducts = await axios(getStockProducts);
        return primeraproducts
    } catch (err) {
        if(err.response.status === 401) {
            let newToken = await axios(config).then(function (response) {
                console.log(response);
                return JSON.stringify(response.data.access_token);
            });
            getProductosAndToken(newToken);
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

    let token = 'qf-h2yn_Y0tgZ4NEWDHi62VdoOT-8ZmqVx-lt3Kd6bstnWavOXa2GhujTZSvGHrwmJJbt1TWitqV8dOOurujoDhIhi_GONzQVHkkUe7hpV9SMP_XImCS3jympISn4PdkpeNDY6FC_bsBVSY7tZqajOGUCigUx6Jro9V0kUMyXcxVVZ7zIIWNGv3zhexha374XmBLBrRzWycRaC-pbMQAXSgrbVYWgCTSMBbLiw510ycHgdgBbnh7yF6WbWDABOtacBWJVdMfgHEKqHYwfxQcPGXLHtvHEJhrmO1QDSmXNLu3TbES5T9JcWTtkW82Ub3rep5IQ2S9R_tuYPgc0gw8vNIysgcEZQbH55_4DPZ9UaEA217vWqEYOPg9cfT5OYeQZ4z7fouPsfy81F4O7LIVHwuWZbEqi0gQmB2jNZGbcm1M0XIGMy00XHUOzZLrC5whUHTUWjmt6hKXm95vZH3wUaU-4IzXYf3Jc9OoWqY1PCsBk5ujdwo_3WACrrxK3J554JN6vRK7iyFzXxauGr-1w8hnhNt77fGO7i9dxBMCoIVNaeNCDilNmzsOFVn1lJDnCDGvy3CDo2ZpBgDrgh0DnA'
    if (doc) {
    //   const token = await getToken();
        let primeraproducts = await getProductosAndToken(token)
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
                Authorization: `Bearer qf-h2yn_Y0tgZ4NEWDHi62VdoOT-8ZmqVx-lt3Kd6bstnWavOXa2GhujTZSvGHrwmJJbt1TWitqV8dOOurujoDhIhi_GONzQVHkkUe7hpV9SMP_XImCS3jympISn4PdkpeNDY6FC_bsBVSY7tZqajOGUCigUx6Jro9V0kUMyXcxVVZ7zIIWNGv3zhexha374XmBLBrRzWycRaC-pbMQAXSgrbVYWgCTSMBbLiw510ycHgdgBbnh7yF6WbWDABOtacBWJVdMfgHEKqHYwfxQcPGXLHtvHEJhrmO1QDSmXNLu3TbES5T9JcWTtkW82Ub3rep5IQ2S9R_tuYPgc0gw8vNIysgcEZQbH55_4DPZ9UaEA217vWqEYOPg9cfT5OYeQZ4z7fouPsfy81F4O7LIVHwuWZbEqi0gQmB2jNZGbcm1M0XIGMy00XHUOzZLrC5whUHTUWjmt6hKXm95vZH3wUaU-4IzXYf3Jc9OoWqY1PCsBk5ujdwo_3WACrrxK3J554JN6vRK7iyFzXxauGr-1w8hnhNt77fGO7i9dxBMCoIVNaeNCDilNmzsOFVn1lJDnCDGvy3CDo2ZpBgDrgh0DnA`,
                },
            };
            const products = await axios(getStockProducts);
            if(i === 1) console.log("Productos ",products.data);
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

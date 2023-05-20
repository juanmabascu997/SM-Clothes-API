const { default: axios } = require("axios")
var qs = require('qs');
const converter = require('json-2-csv')
const fs = require('fs')


var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.PASSWORD 
});

var config = {
    method: 'post',
    url: 'https://rest.contabilium.com/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

const getToken = async () => {
    let token = await axios(config)
    .then(function (response) {
        return JSON.stringify(response.data.access_token)
    })
    return token
}

const getProducts = async (req, res) => {
    try {
        let productsTotal = [];

        let token = 'NincVTNhVt7h0ytO_BeS4CBBtBSqxWvqlfPG11SX7ixiiuv9jw3QLEL15umzc_aoZzCox133Mz54VWBX0LIIj0o2iIbAe33-XpBRHY6GgoB4R4ovRsevI6pFGmj0MmcoBxOINfGj1hzfLuFLlDZdsk_b1iXy7N4VRQoWMLGl2UNYUgA_6ijQmVfauskbZfBevpflzGVL8Zgz8dIyU90cE07T23v3LuxVbNy9saQSmSRrsvvv9X4f-zejg3LBIuxkSRQb7K93WoHKo2ZszBz6i1Pr6Qw-pW0JiBpFZ1OPk17lpbUuJ3OW4WsG3JureB0x66JFQjP32GpwmtNHXt6vkBuEoJrDyH48S0v8EblT9d1v7RN7x_eJwgNIP27mUjKHaAA8oOGIu42S8FNuDwd0XVLQkWdnIey8TTbknWZgraqpBIFv7AmvNppDC9wIVFNsYyEyC9TjwFZBDBPKl6QypMj9D1W2_Qwwkxf5XeBVnfpCWoWPNYuIbP047iTZRiPRXnED-jVs77iQMZoRtd0UuYeNmuxolTUTMi4riXT7uK4JexnDEmzgtLMaakwVle8wl3Wfa2N53fNvZhBGMg4jiA'
            var getStockProducts = {
                method: 'get',
                url: 'https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277&page=1',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            };
        let primeraproducts = await axios(getStockProducts)

        for(let i = 1; i <= Math.ceil(primeraproducts.data.TotalItems / primeraproducts.data.TotalPage ); i++){
            let token = 'NincVTNhVt7h0ytO_BeS4CBBtBSqxWvqlfPG11SX7ixiiuv9jw3QLEL15umzc_aoZzCox133Mz54VWBX0LIIj0o2iIbAe33-XpBRHY6GgoB4R4ovRsevI6pFGmj0MmcoBxOINfGj1hzfLuFLlDZdsk_b1iXy7N4VRQoWMLGl2UNYUgA_6ijQmVfauskbZfBevpflzGVL8Zgz8dIyU90cE07T23v3LuxVbNy9saQSmSRrsvvv9X4f-zejg3LBIuxkSRQb7K93WoHKo2ZszBz6i1Pr6Qw-pW0JiBpFZ1OPk17lpbUuJ3OW4WsG3JureB0x66JFQjP32GpwmtNHXt6vkBuEoJrDyH48S0v8EblT9d1v7RN7x_eJwgNIP27mUjKHaAA8oOGIu42S8FNuDwd0XVLQkWdnIey8TTbknWZgraqpBIFv7AmvNppDC9wIVFNsYyEyC9TjwFZBDBPKl6QypMj9D1W2_Qwwkxf5XeBVnfpCWoWPNYuIbP047iTZRiPRXnED-jVs77iQMZoRtd0UuYeNmuxolTUTMi4riXT7uK4JexnDEmzgtLMaakwVle8wl3Wfa2N53fNvZhBGMg4jiA'
            var getStockProducts = {
                method: 'get',
                url: 'https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277'+ '&page='+ i,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const products = await axios(getStockProducts)

            let arr = products.data.Items.map( e =>{ return {"Id": e.Id.toString(),"Codigo":e.Codigo,"Stock Actual": e.StockActual.toString(), 'Stock con Reservas': e.StockConReservas.toString()}})
            productsTotal.push(...arr)
        }
        converter.json2csv(productsTotal, (err, csv) => {
            if (err) {
                console.log("Error: ",err)
            }
            // print CSV strin
            fs.writeFileSync('todos.csv', csv)
        })

        res.status(200).json({ message: productsTotal.length })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getProducts
}
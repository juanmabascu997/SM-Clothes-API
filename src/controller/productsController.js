const { default: axios } = require("axios")
var qs = require('qs');
const converter = require('json-2-csv')
const fs = require('fs')


var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'sm.clothes2@gmail.com',
  'client_secret': 'monteagudo655' 
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
        for(let i = 1; i <= 27; i++){
            let token = 'Rc-hw-BDMv-_7IzcYMDXrK-QKJEjFiG3EgA_P059naZM3a0GW6dFuk4Jbo61cgqz8WMQKWL3H0LKE_nxO87nwEZV_UEFQs0H5Uurt162mtuHQkRW7DQ-1CVrVAj-kJl77k1jV23X_zxN5CJEbejXt9XM8Zw8T7r_Yp14SG5_1AK4zZKkWbCYRuzWaNnV-dpTQ_JuPxF188StegIgpZTG1wvdwbMP8K0NPnzdS_jSbE0QIr836nmseXPzO9-sRKX9gerEim4BMWEKuRFy2QuQfr_mGKlbn8AzdlG2fbj3TotV9fOIV56hxa_fnYTtlCQX_OuHjKmNpt57R3O_5EPLsxVI3Ur6x2tVYb2JJp0eo_SIEjcVSHktovnwNh3yAS4X2nN1K82zBCOnye4cYbW0r-qLoiwunmTRJfi-1fQHlXqwdD8ZJd0kKCy7SrCBKDa30tycMAWo3zu_KakWyEU8HoOMOdpjTxpWnYIuYk7FxjXuecy2Y0zE1BmYtsICDs_cQ2r7T2NgxEXnREEH1TjNtkw7tj83rA36jcUVysQxf_IR0a6qUeM9j2NKfxB9cRIvQlsJ41bNu7BFcEjAX2Vh6A'
            var getStockProducts = {
                method: 'get',
                url: 'https://rest.contabilium.com/api/inventarios/getStockByDeposito?id=28277'+ '&page='+ i,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const products = await axios(getStockProducts)
            let arr = products.data.Items.map( e =>{ return {"Id":e.Id,"Codigo":e.Codigo}})
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
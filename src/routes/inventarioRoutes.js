const express = require('express')
const router = express.Router()
const { sendInventario } = require('../controller/inventarioController')

//Send inventario
//@route POST /api/inventario
//@access Public

router.post('/', sendInventario)


module.exports = router
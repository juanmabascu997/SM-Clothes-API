const express = require('express')
const router = express.Router()
const { getAll, setMovements } = require('../controller/allMovementsController')

//Get all movements
//@route GET /api/
//@access Public

router.get('/', getAll)

//Post new movements
//@route POST /api/
//@access Public

router.post('/', setMovements)


module.exports = router
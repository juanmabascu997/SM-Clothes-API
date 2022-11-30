const express = require('express')
const router = express.Router()
const { getUsers } = require('../controller/usersController')

//Get all users
//@route GET /api/users
//@access Public

router.get('/', getUsers)


module.exports = router
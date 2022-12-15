require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const connectDB = require('./src/config/db')
const allMovementsRoutes = require('./src/routes/allMovementsRoutes')
const usersRoutes = require('./src/routes/usersRoutes')
const productsRoutes = require('./src/routes/productsRoutes')
const inventarioRoutes = require('./src/routes/inventarioRoutes')

const cors = require('cors');

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());

app.use('/api/allMovements', allMovementsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/inventario', inventarioRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
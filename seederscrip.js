require('dotenv').config()

const usersData = require('./src/data/Users') 
const registersData = require('./src/data/Registers')
const connectDB = require('./src/config/db')

const User = require('./src/modules/User')
const Register = require('./src/modules/Register')

connectDB()

const importFuctions = async () => {
    try {
        await User.deleteMany({})
        await Register.deleteMany({})
        await User.insertMany(usersData)
        await Register.insertMany(registersData)
        console.log('Data imported successfully')
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

importFuctions()
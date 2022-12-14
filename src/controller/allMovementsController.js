const Register = require('../modules/Register')
const { SendEmail } = require('./emailController')

const setMovements = async (req, res) => {
    try {
        await Register.insertMany(req.body.thisBody)
        SendEmail(req.body.thisBody, req.body.action, false)
        res.send("Exito!")
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAll = async (req, res) => {
    try {
        const register = await Register.find()
        let sentAll = true;

        SendEmail(register, null, sentAll)

        res.send(register)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    setMovements,
    getAll
}
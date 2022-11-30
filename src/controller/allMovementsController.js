const Register = require('../modules/Register')


const setMovements = async (req, res) => {
    try {
        const register = new Register(...req.body.thisBody)
        await register.save()

        res.send(register)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAll = async (req, res) => {
    try {
        const register = await Register.find()
        res.send(register)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    setMovements,
    getAll
}
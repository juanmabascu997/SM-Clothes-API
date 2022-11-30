const User = require('../modules/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    getUsers
}
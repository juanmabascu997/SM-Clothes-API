const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    editor_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock_modificate: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: false
    }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
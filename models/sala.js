const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let salaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name must be assigned']
    },
    qr_code: {
        type: String,
        required: [true, 'the qr_code must be assigned']
    }
});

module.exports = mongoose.model('Sala', salaSchema);
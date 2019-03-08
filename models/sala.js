var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var salaSchema = new Schema({
    name = {
        type: String,
        required: [true, 'El nombre de la sala es requerido']
    },
    qr_code = {
        type: String,
        required: [true, 'El nombre de la sala es requerido']
    }
});

module.exports = mongoose.model('Sala', salaSchema);
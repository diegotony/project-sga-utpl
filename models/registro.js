var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var registroSchema = new Schema({
    // date = {
    //     type: String,
    //     required: [true, 'El nombre de la sala es requerido']
    // }
});

module.exports = mongoose.model('Registro', registroSchema);
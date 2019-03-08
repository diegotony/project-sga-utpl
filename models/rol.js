var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var rolSchema = new Schema({
    name = {
        type: String,
        required: [true, 'El nombre de la sala es requerido']
    }
});

module.exports = mongoose.model('Rol', rolSchema);
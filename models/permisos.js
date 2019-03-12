const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let PermisoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la sala es requerido']
    },
    allowedHours: {
        type: Number,
        required: [true, 'The hours must be assigned ']
    },
    allowedDays: {
        type: [String],
        required: [true, 'The days must be assigned ']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Permisos', rolSchema);
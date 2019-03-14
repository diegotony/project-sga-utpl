const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let typeAccess = {
    values: ['ENTRADA', 'SALIDA'],
    message: '{VALUE} its not a valid type of access'
}

// let date = require('date-and-time');
// let now = new Date();


let accesoSchema = new Schema({
    date: Date,
    hour: Date,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'the usuario must be assigned']
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        required: [true, 'the sala must be assigned']
    },
    typeAccess: {
        type: String,
        enum: typeAccess
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Acceso', accesoSchema);
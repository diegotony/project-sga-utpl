const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let permisoSchema = new Schema({
    name: {
        type: String,
        required: [true, ' name required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'the user must be assigned']
    },
    sala: {
        type: Schema.Types.ObjectId,
        ref: 'Sala',
        required: [true, 'the sala must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('PermisoAcceso', permisoSchema);
const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let rolSchema = new Schema({
    day: {
        type: String,
        required: [true, 'the day must be assinged']
    },
    start_time: {
        type: String,
        required: [true, 'The start_time must be assigned ']
    },
    end_time: {
        type: String,
        required: [true, 'The end_time must be assigned ']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'the sala must be assigned']

    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('PermisoRol', rolSchema);
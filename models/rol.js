const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let rolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name must be assigned']
    },
    days: {
        type: [
            String
        ],
        required: [true, 'the days must be assinged']
    },
    start_time: {
        type: String,
        required: [true, 'The start_time must be assigned ']
    },
    end_time: {
        type: String,
        required: [true, 'The end_time must be assigned ']
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Rol', rolSchema);
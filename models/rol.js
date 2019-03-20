const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let rolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Rol', rolSchema);
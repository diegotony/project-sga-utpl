const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let salaSchema = new Schema({

    name: {
        type: String,
        required: [true, 'The name must be assigned']
    },
    description: {
        type: String,
        required: [true, 'the desciption must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }
});

salaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
});


module.exports = mongoose.model('Sala', salaSchema);
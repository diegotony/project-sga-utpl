const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name required']
    },
    secondName: {
        type: String,
        required: [true, 'second name required']
    },
    firstSurname: {
        type: String,
        required: [true, 'last name required']
    },

    secondSurname: {
        type: String,
        required: [true, 'last name required']
    },
    email: {
        type: String,
        required: [true, 'the email must be assigned']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'the rol must be assigned']
    },
    state: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let user_object = user.toObject();
    delete user_object.password;
    return user_object
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});


module.exports = mongoose.model('Usuario', usuarioSchema);
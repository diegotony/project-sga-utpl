var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'first name required']
    },
    lastName: {
        type: String,
        required: [true, 'last name required']
    },
    userName: {
        type: String,
        required: [true, 'user_name required']
    },
    password: {
        type: String,
        required: [true, 'password es requerido']
    },
    email: {
        type: String,
        required: [true, 'email es requerido']
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, 'rol es requerido']
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

module.exports = mongoose.model('Usuario', usuarioSchema);
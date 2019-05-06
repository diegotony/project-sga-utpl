const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({
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
        required: [true, 'the email must be assigned'],
        //unique: true
    },
    username: {
        type: String,
        required: [true, 'the username must be assigned'],
        //unique: true
    },
    password: {
        type: String,
        required: [true, 'the password must be assigned']
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

userSchema.methods.toJSON = function () {
    let user = this;
    let user_object = user.toObject();
    delete user_object.password;
    return user_object
};


userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('User', userSchema);
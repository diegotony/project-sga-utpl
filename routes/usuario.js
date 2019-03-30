const express = require('express')
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const underscore = require('underscore');


//  GET LIST
app.get('/usuario/', (req, res) => {
    Usuario.find({
            state: true
        })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios
            });
        });

});


// GET ID USUARIO


app.get('/usuario/:id', (req, res) => {
    id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            usuarioDB
        });
    });

});


// POST USUARIO DATA dsadasda

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
        state: body.state
    });



    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            sala: usuarioDB
        });

    });


});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombreUsuario = {
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: body.password,
        rol: body.rol,
        state: body.state
    };
    // usuarioBD.save valid
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: usuarioDB
        });
    });

});


app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiaState = {
        state: false
    }

    Usuario.findByIdAndUpdate(id, cambiaState, {
        new: true,
    }, (err, usuarioBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Sala no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrada
        });
    });
});


module.exports = app
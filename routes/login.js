const express = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: "User o pass no encontrada"
                }
            });
        }
        const match = bcrypt.compare(body.password, usuarioDB.password);
        if (match) {
            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });

            res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });

        }

        // if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        //     return res.json({
        //         ok: false,
        //         err: {
        //             message: "User o pass no encontrada"
        //         }
        //     });
        // }
        // let token = jwt.sign({
        //     usuario: usuarioDB
        // }, 'secret', {
        //     expiresIn: "30d"
        // });


    });
});

module.exports = app;
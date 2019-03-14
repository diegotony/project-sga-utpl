const express = require('express')
const app = express();
const Acceso = require('../models/acceso');
const date = require('date-and-time');
const bcrypt = require('bcrypt');
const underscore = require('underscore');
let now = new Date();

//  GET LIST
app.get('/acceso/', (req, res) => {
    Acceso.find({
            state: true
        })
        .exec((err, accesos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                accesos
            });
        });

});


// GET ID USUARIO


app.get('/acceso/:id', (req, res) => {
    id = req.params.id;
    Usuario.findById(id, (err, accesoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!accesoDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            accesoDB
        });
    });

});


// POST ACCESO

app.post('/acceso', (req, res) => {
    let body = req.body;
    let acceso = new Acceso({
        date: date.format(now, 'ddd MMM DD YYYY'),
        hour: date.format(now, 'hh:mm'),
        usuario: body.usuario,
        sala: body.sala,
        typeAccess: body.typeAccess
    });



    acceso.save((err, accesoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!accesoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            acceso: accesoDB
        });

    });


});



module.exports = app
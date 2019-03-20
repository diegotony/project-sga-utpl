const express = require('express')
const app = express();
const PermisoRol = require('../models/permiso_rol');
const date = require('date-and-time');
const bcrypt = require('bcrypt');
const underscore = require('underscore');
let now = new Date();

//  GET LIST
app.get('/permiso/', (req, res) => {
    PermisoRol.find({
            state: true
        })
        .exec((err, permisos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                permisos
            });
        });

});


// GET ID USUARIO


app.get('/permiso/:id', (req, res) => {
    id = req.params.id;
    PermisoRol.findById(id, (err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            permisoDB
        });
    });

});


// POST ACCESO

app.post('/permiso', (req, res) => {
    let body = req.body;
    let permiso = new PermisoRol({
        day: body.day,
        start_time: body.start_time,
        end_time: body.end_time,
        rol: body.rol,
    });

    permiso.save((err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            acceso: permisoDB
        });

    });


});

app.put('/permiso/:id', (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombrePermiso = {
        day: date.format(now, 'ddd MMM DD YYYY', true),
        start_time: body.start_time,
        end_time: body.end_time,
        rol: body.rol,
    };

    PermisoRol.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: permisoDB
        });
    });

});


app.delete('/permiso/:id', (req, res) => {
    let id = req.params.id;

    let cambiaState = {
        state: false
    }

    PermisonRol.findByIdAndUpdate(id, cambiaState, {
        new: true,
    }, (err, permisoBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!permisoBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Permiso no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            sala: permisoBorrada
        });
    });
});


module.exports = app
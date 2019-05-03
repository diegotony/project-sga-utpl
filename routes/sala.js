const express = require('express')
const _ = require('underscore');
const Sala = require('../models/sala');
const app = express();

const {
    verificaToken,
    verifica_Admin_Role
} = require('../middleware/autentificacion');


//  GET LIST
app.get('/sala/', [verificaToken], (req, res) => {
    Sala.find({
            state: true
        })
        .exec((err, salas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                salas
            });
        });

});


// GET ID SALA


app.get('/sala/:id', [verificaToken], (req, res) => {
    id = req.params.id;
    Sala.findById(id, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!salaDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            salaDB
        });
    });

});


// POST SALA

app.post('/sala', [verificaToken, verifica_Admin_Role], (req, res) => {
    let body = req.body;
    let sala = new Sala({
        name: body.name,
        description: body.description

    });



    sala.save((err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!salaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            sala: salaDB
        });

    });


});

app.put('/sala/:id', [verificaToken, verifica_Admin_Role], (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombreSala = {
        nombre: body.nombre,
        description: body.description
    };
    // usuarioBD.save valid
    Sala.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!salaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: salaDB
        });
    });

});


app.delete('/sala/:id', [verificaToken, verifica_Admin_Role], (req, res) => {
    let id = req.params.id;
    let cambiaState = {
        state: false
    }

    Sala.findByIdAndUpdate(id, cambiaState, {
        new: true,
    }, (err, salaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!salaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Sala no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            sala: salaBorrada
        });
    });
});


module.exports = app;
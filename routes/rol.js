const express = require('express')
const app = express();
const Rol = require('../models/rol');



//  GET LIST

app.get('/rol/', (req, res) => {
    Rol.find({})
        .exec((err, roles) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                roles
            });
        });

});


// GET ID ROL


app.get('/rol/:id', (req, res) => {
    id = req.params.id;
    Rol.findById(id, (err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!rolDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            rolDB
        });
    });

});


// POST ROL

app.post('/rol', (req, res) => {
    let body = req.body;
    let rol = new Rol({
        name: body.name,
    });



    rol.save((err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!rolDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            rol: rolDB
        });

    });


});

app.put('/rol/:id', (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombreRol = {
        name: body.nombre,
    };
    Rol.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!rolDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: rolDB
        });
    });

});


app.delete('/rol/:id', (req, res) => {
    let id = req.params.id;
    Rol.findByIdAndRemove(id, (err, rolBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!rolBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Rol no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            sala: rolBorrada
        });
    });
});


module.exports = app
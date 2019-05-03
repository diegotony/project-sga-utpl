const express = require("express");
const app = express();
const PermisonAcceso = require("../models/permiso_acceso");
const Usuario = require("../models/usuario");
const date = require("date-and-time");
var dateFormat = require("dateformat");
const mongoose = require("mongoose");
const {
    verificaToken,
    verifica_Admin_Role
} = require("../middleware/autentificacion");

let now = new Date();

dateFormat.i18n = {
    dayNames: [
        "Dom",
        "Lun",
        "Mar",
        "Mie",
        "Jue",
        "Vie",
        "Sab",
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
    ],
    monthNames: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]
};

//  GET LIST of ALL ACCESS

app.get("/acceso/", verificaToken, (req, res) => {
    PermisonAcceso.find({
        state: true
    }).exec((err, permisos) => {
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

    console.log(dateFormat(now, "dddd, mmmm dS, yyyy"));
});

// GET INFO BY ID OF ACCESS

app.get("/acceso/:id", verificaToken, (req, res) => {
    id = req.params.id;
    PermisonAcceso.findById(id, (err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!permisoDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        }
        res.json({
            ok: true,
            permisoDB
        });
    });
});

//  GET ACCESS BY ID of USER

app.get("/acceso/user/:id", verificaToken, (req, res) => {
    id = req.params.id;
    query = "'" + id + "'";
    PermisonAcceso.find({
            user: mongoose.Types.ObjectId(id)
        },
        (err, permisoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!permisoDB) {
                return res.status(500).json({
                    ok: false,
                    err: "El id no es correcto"
                });
            }
            res.json({
                ok: true,
                permisoDB
            });
        }
    );
});

// POST DE ACCESO

app.post("/acceso", verificaToken, (req, res) => {
    let body = req.body;

    let entrada = new PermisonAcceso({
        date: date.format(now, 'ddd MMM DD YYYY', true),
        hour: date.format(now, 'hh:mm:ss A'),
        user: body.user,
        sala: body.sala,
        typeAccess: "ENTRADA"
    });

    let salida = new PermisonAcceso({
        date: date.format(now, 'ddd MMM DD YYYY', true),
        hour: date.format(now, 'hh:mm:ss A'),
        user: body.user,
        sala: body.sala,
        typeAccess: "SALIDA"
    });

    PermisonAcceso.findOne(({
        user: body.user
    }), (err, result) => {
        console.log(result)
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (result === null) {
            entrada.save()
            return res.status(200).json({
                ok: true,
                entrada
            });

        } else {
            if (result.typeAccess === 'SALIDA') {
                entrada.save()
                return res.status(200).json({
                    "ok": true,
                    acceso: entrada
                });
            }
            if (result.typeAccess === 'ENTRADA') {
                salida.save()
                return res.status(200).json({
                    "ok": true,
                    acceso: salida
                });
            }
        }
    }).sort({
        _id: -1
    })
});


module.exports = app;
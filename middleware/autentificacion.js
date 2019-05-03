const jwt = require('jsonwebtoken');

//====================================================
// Verificar Token
//====================================================

let verificaToken = (req, res, next) => {
    let token = req.get('token');
    // res.json({
    //     token: token
    // });
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido"
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });


};

//====================================================
// Verifica Admin Rol
//====================================================

let verifica_Admin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.rol == "5c9e85a3e850a10017df4ec9" || usuario.rol == "5c9ff34abd008c69cbee0bda") {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

}

module.exports = {
    verificaToken,
    verifica_Admin_Role
};
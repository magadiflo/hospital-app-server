const Usuario = require('../models/Usuario');

const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'getUsuarios'
    });
}

const crearUsuario = async (req, res) => {
    const { nombre, password, email } = req.body;

    const usuario = new Usuario(req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
}

module.exports = {
    getUsuarios,
    crearUsuario
}
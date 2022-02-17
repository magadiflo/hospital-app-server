const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res) => {

    //Obtiene listado de usuarios
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res) => {
    const { nombre, password, email } = req.body;

    const usuario = new Usuario(req.body);

    //Guarda el usuario en la BD
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
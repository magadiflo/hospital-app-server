const { response } = require('express'); //Lo usaremos únicamente para obtener el tipado
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');


const getUsuarios = async (req, res) => {

    //Obtiene listado de usuarios
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res = response) => {
    const { nombre, password, email } = req.body;

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }


    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);
    
        //Guarda el usuario en la BD
        await usuario.save();
    
        res.json({
            ok: true,
            usuario
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario
}
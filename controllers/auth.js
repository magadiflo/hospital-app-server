const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no válida',
            });
        }

        //Generar el TOKEN - JWT

        res.json({
            ok: true,
            msg: 'Login correcto'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
} 

module.exports = {
    login
}
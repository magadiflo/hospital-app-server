const { response } = require('express'); //Lo usaremos únicamente para obtener el tipado
const bcrypt = require('bcryptjs');
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
    const { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
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

const actualizarUsuario = async (req, res = response) => {
    
    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usaurioDB = await Usuario.findById(uid);
        if(!usaurioDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese uid"
            });
        }
        
        // Actualizaciones
        const campos = req.body;

        if(usaurioDB.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usaurio con ese email',
                });
            }
        }

        delete campos.password; //Borrando del objeto campos el atributo password
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });    
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
}
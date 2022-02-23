const { response } = require('express');
const Medico = require('../models/Medico');

const getMedicos = (req, res) => {
    res.json({
        ok: true,
        msg: 'getMedicos'
    });
}

const crearMedico = async (req, res) => {
    const uid = req.uid;
    const medico = new Medico({usuario: uid, ...req.body});

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
           medico: medicoDB
        });   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }    
}

const actualizarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}
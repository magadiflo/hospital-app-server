const { response } = require('express');
const Hospital = require('../models/Hospital');

const getHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

const crearHospital = async (req, res) => {

    const uid = req.uid; //El valor fue establecido en el middleware validar-jwt.js
    const hospital = new Hospital({usuario: uid, ...req.body});

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}
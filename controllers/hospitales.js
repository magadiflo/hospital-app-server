const { response } = require('express');

const getHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

const crearHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'crearHospital'
    });
}

const actualarHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'actualarHospital'
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
    actualarHospital,
    borrarHospital,
}
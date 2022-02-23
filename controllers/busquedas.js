const { response } = require('express');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regExp = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regExp}),
        Medico.find({nombre: regExp}),
        Hospital.find({nombre: regExp})
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

module.exports = {
    getTodo
}
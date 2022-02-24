const { response } = require('express');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regExp = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regExp }),
        Medico.find({ nombre: regExp }),
        Hospital.find({ nombre: regExp })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regExp = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regExp })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regExp })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regExp });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos u hospitales'
            });
    }

    res.json({
        ok: true,
        resultdos: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion,
}
const { response } = require('express');
const Hospital = require('../models/Hospital');

const getHospitales = async (req, res) => {    
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
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

const actualizarHospital = async (req, res) => {
    const id = req.params.id;
    const uid = req.uid; //como pasamos por la autenticación del JWT, allí es donde se establece el uid
    try {
        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});
        
        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }
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
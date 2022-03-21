const { response } = require('express');
const Medico = require('../models/Medico');

const getMedicos = async (req, res) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');
    res.json({
        ok: true,
        medicos
    });
}

const obtenerMedicoPorId = async (req, res) => {
    const id = req.params.id;//El id del médico a buscar
    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');
        res.json({
            ok: true,
            medico
        });        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });    
    }
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

const actualizarMedico = async (req, res) => {
    const id = req.params.id;//El id del médico a actualizar
    const uid = req.uid;//Establecido en el validar JWT
    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid,    
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarMedico = async (req, res) => {
    const id = req.params.id;//El id del médico a actualizar
    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }
        
        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    obtenerMedicoPorId
}
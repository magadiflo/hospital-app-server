/**
 * Hospitales
 * ruta: /api/hospitales
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');
 const {
    getHospitales,
    crearHospital,
    actualarHospital,
    borrarHospital,
} = require('../controllers/hospitales');
 
 const router = Router();
 
 router.get('/', getHospitales);
 
 router.post('/', [

 ], crearHospital);
 
 router.put('/:id', [

 ], actualarHospital);
 
 router.delete('/:id', [

 ], borrarHospital);
 
 module.exports = router;
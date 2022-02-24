const fs = require('fs');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    switch(tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No se encontró médico por id');
                return false;
            }
            const pathViejo = `./uploads/medicos/${medico.img}`;
            if(fs.existsSync(pathViejo)){
                //Borrar la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
        break;
        case 'usuarios':
        break;
    }        
}

module.exports = {
    actualizarImagen,
}
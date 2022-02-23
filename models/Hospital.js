const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }
}, { collection: 'hospitales' }); //Así aparecerá en mongoose, la tabla en plural y no hospitals

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);
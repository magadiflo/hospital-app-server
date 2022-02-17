const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://MEAN_USER:6uI45DpiVnPtQ9No@micluster.xkylj.mongodb.net/hospitaldb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

module.exports = {
    dbConnection
}
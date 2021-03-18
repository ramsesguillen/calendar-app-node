const mongoose = require('mongoose');





const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log('Base de datos online')
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}


module.exports = {
    dbConnection
}

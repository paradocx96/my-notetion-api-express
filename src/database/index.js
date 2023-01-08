const { success, error } = require('consola');
const mongoose = require('mongoose');

// App Config
const { APP_DB } = require('../constants');

// DB Config
const connectDB = async () => {
    await mongoose.set('strictQuery', false);

    await mongoose.connect(APP_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        success({
            message: `Successfully connected with the Database!!!`,
            badge: true
        })
    }).catch((err) => {
        error({
            message: `Unable to connect with the Database: ${err}`,
            badge: true
        })
    });
}
module.exports = connectDB;

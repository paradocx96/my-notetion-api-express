const mongoose = require('mongoose');
const { success, error } = require('consola');

// App Config
const { APP_DB } = require('../config');

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

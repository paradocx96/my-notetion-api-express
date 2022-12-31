const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const {success, error} = require('consola');

// App Config
const {APP_PORT} = require('./config');

// DB Config
const connectDB = require('./database');

// App Init
const app = express();

// Start APP
const startApp = async () => {
    await connectDB();

    await app.listen(APP_PORT, () => {
        success({
            message: `Server started on port ${APP_PORT}`,
            badge: true
        })
    });
};

startApp();

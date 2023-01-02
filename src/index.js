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

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes Config
const routes = require('./routes');
app.use('/api', routes);

// Start the server
const startApp = async () => {
    try {
        // Connect to DB
        await connectDB();

        // Start listen port for the server
        await app.listen(APP_PORT, () => {
            success({
                message: `Server started on port ${APP_PORT}`,
                badge: true
            })
        });
    } catch (err) {
        error({
            message: `Server could not start!!! Error: ${err.message}`,
            badge: true
        });
        startApp();
    }
};

startApp();

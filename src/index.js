const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {success, error} = require('consola');
const routes = require('./routes');
const {APP_PORT} = require('./config');
const connectDB = require('./database');

// App Initialization
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Configuration
require('./middlewares/passport')(passport);

// Routes Configuration
app.get('/', (req, res) =>
    res.status(200).json({message: 'NM-APP API Server Up & Running!!!'}));
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

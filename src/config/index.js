require("dotenv").config();

module.exports = {
    APP_DB: process.env.APP_DB,
    APP_PORT: process.env.PORT || process.env.APP_PORT,
    APP_SECRET: process.env.APP_SECRET,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    NODE_ENV: process.env.NODE_ENV
}

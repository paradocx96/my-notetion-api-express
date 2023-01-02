require("dotenv").config();

module.exports = {
    DB_URL: process.env.DB_URL,
    APP_PORT: process.env.APP_PORT,
    SECRET: process.env.SECRET,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    NODE_ENV: process.env.NODE_ENV
}

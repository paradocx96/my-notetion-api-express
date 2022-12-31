require("dotenv").config();

module.exports ={
    DB_URL: process.env.DB_URL,
    APP_PORT: process.env.APP_PORT,
    SECRET: process.env.SECRET
}

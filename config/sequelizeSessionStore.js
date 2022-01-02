require('dotenv').config();
const Sequelize = require("sequelize");
const session = require('express-session');

const database = process.env.DB_NAME || null;
const username = process.env.DB_USERNAME || null;
const password = process.env.DB_PASSWORD || null;
const host = process.env.DB_HOST || null;
const dialect = process.env.DB_DIALECT || null;
const port = process.env.PORT || null;


// create database, ensure 'sqlite3' in your package.json
const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  port: port,
  storage: "./session.postgres",
});

module.exports = sequelize;
require('dotenv').config();
const {Sequelize} = require('sequelize');

const database = process.env.DB_NAME || null;
const username = process.env.DB_USERNAME || null;
const password = process.env.DB_PASSWORD || null;
const host = process.env.DB_HOST || null;
const dialect = process.env.DB_DIALECT || null;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
  });

module.exports = sequelize;

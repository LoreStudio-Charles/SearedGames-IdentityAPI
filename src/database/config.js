const dotenv = require('dotenv/config');
const fs = require('fs');


const db_writer_connection_string = process.env.DB_WRITER_CONNECTION
const writer_connection = JSON.parse(db_writer_connection_string)
console.log(writer_connection)

module.exports = {
  development: {
    username: writer_connection.username,
    password: writer_connection.password,
    database: "seared_db",
    host: writer_connection.host,
    port: writer_connection.port,
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};

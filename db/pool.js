const { Pool } = require("pg");

const path = require("node:path")
process.loadEnvFile(path.resolve(__dirname, "../.env"))

module.exports = new Pool({
  host: process.env.DB_HOST, // <host>
  user: process.env.DB_USER, // <role_name>
  database: process.env.DB_NAME, // message_board
  password: process.env.DB_PASSWORD, // <role_password>
  port: process.env.DB_PORT, // <port>
});
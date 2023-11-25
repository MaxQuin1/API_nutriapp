const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "mysql-snowy-zero.alwaysdata.net",
  user: "333373",
  password: "46154774",
  database: "snowy-zero_nutriapp",
});

connection.connect(function (error) {
  if (error) {
    console.log("Error al conectar la bd");
  } else {
    console.log("conexion realizada exitosamente");
  }
});

module.exports = connection;

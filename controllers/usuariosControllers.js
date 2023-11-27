// En el servidor (Node.js)
const { json } = require("express");
const connection = require("../database");

function agregarUsuario(request, response) {
    const nombre_usuario = request.body.nombre_usuario
    const correo_electronico = request.body.correo_electronico
    const contrasena = request.body.contrasena
    const tipo_usuario = request.body.tipo_usuario

  connection.query(
    `INSERT INTO usuarios (nombre, correo_electronico, contrasena, tipo_usuario) VALUES (?, ?, ?, ?);`,
    [
      nombre_usuario,
      correo_electronico,
      contrasena,
      tipo_usuario,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: "Error al agregar usuario" });
      } else {
        response
          .status(200)
          .json({ mensaje: "Usuario agregado correctamente" });
      }
    }
  );  
}

module.exports = {
  agregarUsuario,
};

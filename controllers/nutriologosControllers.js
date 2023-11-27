const { json } = require("express");
const connection = require("../database");

function agregarNutriologo(request, response) {
    const nombre_usuario = request.body.nombre_usuario
    const correo_electronico = request.body.correo_electronico
    const contrasena = request.body.contrasena

  connection.query(
    `INSERT INTO nutriologos (nombre_nutriologo, correo_electronico, contrasena) VALUES (?, ?, ?);`,
    [
      nombre_usuario,
      correo_electronico,
      contrasena,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: "Error al agregar al nutriologo" });
      } else {
        response
          .status(200)
          .json({ mensaje: "Nutriologo agregado correctamente" });
      }
    }
  );  
}

module.exports = {
    agregarNutriologo,
};
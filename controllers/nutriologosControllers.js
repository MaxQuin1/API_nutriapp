const { json } = require("express");
const connection = require("../database");

const obtenerNutriologos = (peticion, respuesta) => {
  const sql = "SELECT * FROM nutriologos";
  connection.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({ error: "error en la consulta" });
    }
    return respuesta.json({ listanutriologos: resultado });
  });
};

const obtenerNutriologosPorId = (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM nutriologos WHERE id_nutriologo = ?";
  connection.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json({ Error: "Error en la consulta" });
    return respuesta.json({ Nutriologo: resultado });
  });
};

function agregarNutriologo(request, response) {
  const nombre_usuario = request.body.nombre_usuario;
  const correo_electronico = request.body.correo_electronico;
  const contrasena = request.body.contrasena;

  connection.query(
    `INSERT INTO nutriologos (nombre_nutriologo, correo_electronico, contrasena) VALUES (?, ?, ?);`,
    [nombre_usuario, correo_electronico, contrasena],
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
  obtenerNutriologos,
  obtenerNutriologosPorId,
  agregarNutriologo,
};

const { json } = require("express");
const connection = require("../database");

function agregarToken(request, response) {
  const token = request.body.token;
  const nutriologo = request.body.nutriologo;

  connection.query(
    `INSERT INTO token (token, id_nutriologo) VALUES (?, ?);`,
    [token, nutriologo],
    (error, result) => {
      if (error) {
        console.error("Error al agregar el token:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        response.status(200).json({ mensaje: "Token agregado correctamente" });
      }
    }
  );
}

function buscarToken(request, response) {
  const token = request.params.token;

  connection.query(
    'SELECT * FROM token WHERE token = ?',
    [token],
    (error, result) => {
      if (error) {
        console.error('Error ejecutando la consulta:', error);
        response.status(500).json({
          respuesta: 'Error en el servidor',
          status: false,
        });
        return;
      }      

      if (result.length === 0) {
        response.status(404).json({
          respuesta: 'No se encontró el token',
          length: result.length,
          status: false,
        });
      } else {
        response.status(200).json({
          length: result.length,
          status: true,
        });
      }
    }
  );
}

module.exports = {
  agregarToken,
  buscarToken,
};

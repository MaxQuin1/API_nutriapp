const { json } = require("express");
const connection = require("../database");

const obtenerPacientes = (peticion, respuesta) => {
    const sql = "SELECT * FROM pacientes WHERE estatus = 'Pagado'";
    connection.query(sql, (error, resultado) => {
      if (error) {
        return respuesta.json({ error: "error en la consulta" });
      }
      return respuesta.json({ listapacientes: resultado });
    });
  };

const obtenerPacientesPorId = (peticion, respuesta) => {
    const id = peticion.params.id;
    const sql = "SELECT * FROM pacientes WHERE id_paciente = ?";
    connection.query(sql, [id], (error, resultado) => {
      if (error) return respuesta.json({ Error: "Error en la consulta" });
      return respuesta.json({ Paciente: resultado });
    });
  };

  function agregarPaciente(request, response) {
    const nombre_usuario = request.body.nombre_usuario
    const correo_electronico = request.body.correo_electronico
    const contrasena = request.body.contrasena
    const token = request.body.token

  connection.query(
    `INSERT INTO pacientes (nombre_paciente, correo_electronico, contrasena, token) VALUES (?, ?, ?, ?);`,
    [
      nombre_usuario,
      correo_electronico,
      contrasena,
      token
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: "Error al agregar al paciente" });
      } else {
        response
          .status(200)
          .json({ mensaje: "El paciente agregado correctamente" });
      }
    }
  );  
}

  module.exports = {
    obtenerPacientes,
    obtenerPacientesPorId,
    agregarPaciente,
};
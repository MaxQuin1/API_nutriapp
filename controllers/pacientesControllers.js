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

  module.exports = {
    obtenerPacientes,
    obtenerPacientesPorId,
};
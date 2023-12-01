const { json } = require("express");
const connection = require("../database");

const obtenerCitas = (peticion, respuesta) => {
  const sql = "SELECT * FROM citas";
  connection.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({ error: "error en la consulta" });
    }
    return respuesta.json({ listacitas: resultado });
  });
};

const actualizarCitas = (peticion, respuesta) => {
  const id = peticion.params.id;

  connection.query(
    "UPDATE citas SET status = 1 WHERE id_cita = ?",
    [id],
    (error, resultados) => {
      if (error) {
        console.error("Error al actualizar citas:", error);
        respuesta.status(500).send("Error al actualizar citas");
      } else {
        console.log("Cita actualizada exitosamente");
        respuesta.status(200).send("Cita actualizada exitosamente");
      }
    }
  );
};

const crearCitas = (peticion, respuesta) => {
  const { Fecha, Hora, Paciente } = peticion.body;
  connection.query(
    "INSERT INTO citas (Fecha, Hora, Paciente) VALUES (?, ?, ?)",
    [Fecha, Hora, Paciente],
    (error, results) => {
      if (error) {
        console.error("Error al agregar cita", error);
        respuesta.status(500).json({
          error: "Error al agregar cita",
        });
      } else {
        connection.query(
          "SELECT * FROM citas WHERE id_cita = ?",
          [results.insertId],
          (error, results) => {
            if (error) {
              console.error("Error al obtener la cita", error);
              respuesta.status(500).json({
                error: "Error al obtener la cita",
              });
            } else {
              respuesta.json({ cita: results[0], mensaje: "Cita agregada" });
            }
          }
        );
      }
    }
  );
};

const elimninarCitasPorId = (peticion, respuesta) => {
  const id = peticion.params.id_cita;

  connection.query(
    "DELETE FROM citas WHERE id_cita = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar", error);
        respuesta.status(500), json({ error: "Ocurrio un error eliminar" });
      } else if (results.length === 0) {
        respuesta.status(500).json({ error: "Error 1234" });
      } else {
        respuesta.json({ message: "la cita fue confirmada" });
      }
    }
  );
};

module.exports = {
  obtenerCitas,
  crearCitas,
  elimninarCitasPorId,
  actualizarCitas,
};

const { json } = require("express");
const connection = require("../database");

const obtenerComidas = (peticion, respuesta) => {
  const sql = "SELECT * FROM comidas";
  connection.query(sql, (error, resultado) => {
    if (error) {
      return respuesta.json({ error: "error en la consulta" });
    }
    return respuesta.json({ listacomidas: resultado });
  });
};

const crearComida = (peticion, respuesta) => {
  const { id_paciente, nombre_alimento, cantidad_dias } = peticion.body;
  connection.query(
    "INSERT INTO comidas (id_paciente, nombre_alimento, cantidad_dias) VALUES (?, ?, ?)",
    [id_paciente, nombre_alimento, cantidad_dias],
    (error, results) => {
      if (error) {
        console.error("Error al agregar comida", error);
        respuesta.status(500).json({
          error: "Error al agregar comida",
        });
      } else {
        const nuevoAlimento = {
          id_alimento: results.insertId,
          id_paciente: id_paciente,
          nombre_alimento: nombre_alimento,
          cantidad_dias: cantidad_dias,
        };
        respuesta.json({
          message: "comida agregada",
          nuevoAlimento: nuevoAlimento,
        });
      }
    }
  );
};

function actualizarComidaPorId(request, response) {
  const id = request.params.id;
  const nombre = request.body.nombre_alimento;
  const cantidad_dias = request.body.cantidad_dias;

  connection.query(
    "UPDATE comidas SET nombre_alimento = ?, cantidad_dias = ? WHERE id_alimento = ?",
    [nombre, cantidad_dias, id],
    (error, result) => {
      if (error) {
        console.error("Error al actualizar el alimento:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        response
          .status(200)
          .json({ mensaje: "Alimento actualizado correctamente" });
      }
    }
  );
}

const eliminarComidasPorId = (peticion, respuesta) => {
  const id = peticion.params.id;

  connection.query(
    "DELETE FROM comidas WHERE id_alimento = ?",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error al eliminar", error);
        respuesta.status(500).json({ error: "Ocurrió un error al eliminar" });
      } else if (results.affectedRows === 0) {
        respuesta.status(500).json({ error: "Error 1234" });
      } else {
        respuesta.json({ message: "La comida fue eliminada correctamente" });
      }
    }
  );
};

module.exports = {
  obtenerComidas,
  crearComida,
  actualizarComidaPorId,
  eliminarComidasPorId,
};

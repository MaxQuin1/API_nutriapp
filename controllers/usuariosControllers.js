// En el servidor (Node.js)
const { json } = require("express");
const connection = require("../database");

const obtenerUsuarios = (peticion, respuesta) => {
  const sql = "SELECT * FROM usuarios";
  connection.query(sql, (error, resultado) => {
      if (error) {
          return respuesta.json({ error: "error en la consulta" });
      }
      return respuesta.json({ listausuarios: resultado });
  });
};

function obtenerUsuarioPorId(request, response) {
  const id = request.params.id;

  connection.query(
    "SELECT * FROM usuarios WHERE id_usuarios = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error al obtener el usuario por ID:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length > 0) {
          const usuario = result[0];
          response.status(200).json({ usuario: usuario });
        } else {
          response.status(404).json({ mensaje: "Usuario no encontrado" });
        }
      }
    }
  );
}

function actualizarUsuarioPorId(request, response) {
  const id = request.params.id;
  const nombre = request.body.nombre;
  const correo = request.body.correo;
  const contrasena = request.body.contrasena;

  connection.query(
    "UPDATE usuarios SET nombre = ?, correo_electronico = ?, contrasena = ? WHERE id_usuarios = ?",
    [nombre, correo, contrasena, id],
    (error, result) => {
      if (error) {
        console.error("Error al actualizar el usuario:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        response
          .status(200)
          .json({ mensaje: "Usuario actualizado correctamente" });
      }
    }
  );
}

function agregarUsuario(request, response) {
  const nombre_usuario = request.body.nombre_usuario;
  const correo_electronico = request.body.correo_electronico;
  const contrasena = request.body.contrasena;
  const tipo_usuario = request.body.tipo_usuario;

  connection.query(
    `INSERT INTO usuarios (nombre, correo_electronico, contrasena, tipo_usuario) VALUES (?, ?, ?, ?);`,
    [nombre_usuario, correo_electronico, contrasena, tipo_usuario],
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
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuarioPorId,
  agregarUsuario,
};

const { json } = require("express");
const connection = require("../database");

function Login(request, response) {
  const email = request.body.correo_electronico;
  const password = request.body.contrasena;

  connection.query(
    `SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?`,
    [email, password],
    (error, result) => {
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "no se encontro usuario",
          length: result.length,
          status: false,
        });
      } else {
        // Comprobar si el resultado es un array y no es null o undefined
        const userIndex = result.findIndex(user => user !== null && user !== undefined);
        
        if (userIndex !== -1) {
          const tipoUsuario = result[userIndex].tipo_usuario;
          response.status(200).json({
            respuesta: {
              usuario: result[userIndex],
              tipo_usuario: tipoUsuario,
            },
            length: result.length,
            status: true,
          })
        } else {
          response.status(200).json({
            respuesta: "no se encontro usuario válido",
            length: result.length,
            status: false,
          });
        }
      }
    }
  );
}

module.exports = {
  Login,
};

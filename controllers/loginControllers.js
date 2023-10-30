const { json } = require("express");
const connection = require("../database");

function Login(request, response) {
  const email = request.body.correo_electronico;
  const password = request.body.contrasena;

  connection.query(
    `SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?`,
    [email, password],
    (error, result) => {
      if (result.length == 0) {
        response.status(200).json({
          respuesta: "no se encontro usuario",
          length: result.length,
          status: false,
        });
      } else {
        response.status(200).json({
          respuesta: result,
          length: result.length,
          status: true,
        });
      }
    }
  );
}
module.exports = {
  Login,
};

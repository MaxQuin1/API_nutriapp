const express = require("express");
const cors = require("cors");

const login = require('./router/loginRouter')
const pacientesRouter = require('./router/pacientesRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/pacientes", pacientesRouter);


// app.get("/obtenerPacientes", (peticion, respuesta) => {
//   const sql = "SELECT * FROM pacientes WHERE estatus = 'Pagado'";
//   conexion.query(sql, (error, resultado) => {
//     if (error) {
//       return respuesta.json({ error: "error en la consulta" });
//     }
//     return respuesta.json({ listapacientes: resultado });
//   });
// });

// app.get("/obtenerPaciente/:id", (peticion, respuesta) => {
//   const id = peticion.params.id;
//   const sql = "SELECT * FROM pacientes WHERE id_paciente = ?";
//   conexion.query(sql, [id], (error, resultado) => {
//     if (error) return respuesta.json({ Error: "Error en la consulta" });
//     return respuesta.json({ Paciente: resultado });
//   });
// });

app.listen(8082, () => {
  console.log("servidor iniciando...");
});
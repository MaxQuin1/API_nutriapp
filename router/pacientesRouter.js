const express = require("express");
const pacientesControllers = require("../controllers/pacientesControllers");

const router = express.Router();

router.get("/", pacientesControllers.obtenerPacientes);
router.get("/:id_paciente", pacientesControllers.obtenerPacientesPorId);
router.post("/", pacientesControllers.agregarPaciente);

module.exports = router;

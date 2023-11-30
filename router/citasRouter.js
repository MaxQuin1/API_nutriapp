const express = require("express");
const citaControllers = require("../controllers/citaControllers");

const router = express.Router();

router.get("/", citaControllers.obtenerCitas);
router.post("/", citaControllers.crearCitas);
router.delete("/:id_cita", citaControllers.elimninarCitasPorId);
router.put("/:id", citaControllers.actualizarCitas)

module.exports = router;
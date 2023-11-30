const express = require("express");
const comidasControllers = require("../controllers/comidasControllers");

const router = express.Router();

router.get("/", comidasControllers.obtenerComidas);
router.post("/", comidasControllers.crearComida);
router.put("/:id", comidasControllers.actualizarComidaPorId)
router.delete("/:id", comidasControllers.eliminarComidasPorId)

module.exports = router;
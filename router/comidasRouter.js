const express = require("express");
const comidasControllers = require("../controllers/comidasControllers");

const router = express.Router();

router.get("/", comidasControllers.obtenerComidas);
router.post("/", comidasControllers.crearComida);
router.delete("/:id_alimento", comidasControllers.elimninarComidasPorId)

module.exports = router;
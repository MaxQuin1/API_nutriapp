const express = require("express");
const usuariosControllers = require("../controllers/usuariosControllers");

const router = express.Router();

router.get("/:id", usuariosControllers.obtenerUsuarioPorId);
router.put("/:id", usuariosControllers.actualizarUsuarioPorId);
router.post("/agregarUsuario", usuariosControllers.agregarUsuario);

module.exports = router;

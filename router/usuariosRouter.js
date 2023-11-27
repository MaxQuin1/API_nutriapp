const express = require("express");
const usuariosControllers = require("../controllers/usuariosControllers");

const router = express.Router();

router.post("/agregarUsuario", usuariosControllers.agregarUsuario);

module.exports = router;

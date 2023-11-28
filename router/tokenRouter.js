const express = require("express");
const tokenControllers = require("../controllers/tokenControllers");
const router = express.Router();

router.get("/:token", tokenControllers.buscarToken);
router.post("/", tokenControllers.agregarToken);

module.exports = router

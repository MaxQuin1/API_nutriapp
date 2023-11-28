const express = require("express");
const nutriologosControllers = require("../controllers/nutriologosControllers");

const router = express.Router();

router.get("/", nutriologosControllers.obtenerNutriologos);
router.get("/:id_nutriologo", nutriologosControllers.obtenerNutriologosPorId);
router.post("/", nutriologosControllers.agregarNutriologo);

module.exports = router;
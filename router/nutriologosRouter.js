const express = require("express");
const nutriologosControllers = require("../controllers/nutriologosControllers");

const router = express.Router();

router.post("/", nutriologosControllers.agregarNutriologo);

module.exports = router;
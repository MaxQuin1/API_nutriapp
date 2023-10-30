const express = require("express");
const loginControllers = require("../controllers/loginControllers");
const router = express.Router();

router.post("/", loginControllers.Login);

module.exports = router
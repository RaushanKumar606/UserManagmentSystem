const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/signup - Register a new user
router.post("/signup", signup);

// POST /api/auth/login - Authenticate a user
router.post("/login", login);

module.exports = router; 
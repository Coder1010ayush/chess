const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Local Auth Routes
router.post("/signup", signup);
router.post("/login", login);

// REMOVE GOOGLE OAUTH ROUTES
// router.get("/google", ...);
// router.get("/google/callback", ...);

module.exports = router;

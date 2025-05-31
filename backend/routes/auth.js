const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Local Auth Routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated user route
router.get('/me', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.json(req.user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logged out" });
});

module.exports = router;

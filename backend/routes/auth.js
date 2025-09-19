const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get authenticated user
router.get("/me", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.json({ user });
    } catch (err) {
        console.error("Error in /me route:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});

// Logout
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });
        return res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in /logout route:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

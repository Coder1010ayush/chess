const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Local Auth Routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated user route
router.get("/me", async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        res.json({ user });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
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

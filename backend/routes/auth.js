const express = require("express");
const passport = require("passport");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Local
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
}), (req, res) => {
    // You can redirect to frontend with token if needed
    res.redirect("http://localhost:3000/dashboard");
});

module.exports = router;

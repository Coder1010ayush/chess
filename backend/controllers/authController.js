const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Set cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.signup = async (req, res) => {
    const { username, email, fullName, password, avatar } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, fullName, password: hashed, avatar });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Set token in cookie
        res.cookie("token", token, cookieOptions);

        res.status(201).json({ user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Set token in cookie
        res.cookie("token", token, cookieOptions);

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

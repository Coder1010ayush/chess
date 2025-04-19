const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { username, email, fullName, password, avatar } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, fullName, password: hashed, avatar });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Signup failed" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

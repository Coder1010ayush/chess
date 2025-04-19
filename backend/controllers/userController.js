const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");

exports.updateProfile = async (req, res) => {
    const { fullName, email } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(req.user.id, { fullName, email }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
};

exports.updatePassword = async (req, res) => {
    const { password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const updated = await User.findByIdAndUpdate(req.user.id, { password: hashed }, { new: true });
        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(500).json({ error: "Password update failed" });
    }
};

exports.updateAvatar = async (req, res) => {
    const fileStr = req.body.image;
    try {
        const uploaded = await cloudinary.uploader.upload(fileStr, {
            folder: "avatars",
            transformation: [{ width: 300, height: 300, crop: "fill" }],
        });

        const user = await User.findByIdAndUpdate(req.user.id, { avatar: uploaded.secure_url }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Avatar upload failed" });
    }
};

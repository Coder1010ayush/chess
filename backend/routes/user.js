const express = require("express");
const router = express.Router();
const { updateProfile, updatePassword, updateAvatar } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

router.put("/update", verifyToken, updateProfile);
router.put("/password", verifyToken, updatePassword);
router.put("/avatar", verifyToken, updateAvatar);

module.exports = router;

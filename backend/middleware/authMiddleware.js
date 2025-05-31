const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    // Try cookie first, then Authorization header
    const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith("Bearer ") &&
            req.headers.authorization.split(" ")[1]);

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

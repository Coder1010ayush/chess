const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();
require("./config/passport");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 9092;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data
app.use(session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Custom Sample Endpoint from your old code
app.post("/send-data", (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received successfully!" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);


// for testing purposes
app.get("/", (req, res) => {
    res.send("Chess backend API is running successfully!");
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

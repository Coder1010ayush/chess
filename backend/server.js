const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9092;

// ✅ Middleware setup BEFORE routes
app.use(cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true                // enable cookies and headers
}));
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// ✅ Optional test endpoint
app.post("/send-data", (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received successfully!" });
});

app.get("/", (req, res) => {
    res.send("Chess backend API is running successfully!");
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
